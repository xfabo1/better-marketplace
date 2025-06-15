package org.bettermarketplace.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.bettermarketplace.api.dto.filter.SearchFilterDto;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.security.CookieUtil;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/v1/items")
@Validated
@Slf4j
public class ItemController {

	private static final ItemMapper ITEM_MAPPER = ItemMapper.INSTANCE;
	private static final LocationMapper LOCATION_MAPPER = LocationMapper.INSTANCE;

	private final TokenService tokenService;
	private final ItemService itemService;
	private final LocationService locationService;

	@Autowired
	public ItemController(ItemService itemService, LocationService locationService,
			TokenService tokenService) {
		this.itemService = itemService;
		this.locationService = locationService;
		this.tokenService = tokenService;
	}

	@GetMapping("/preview")
	public ResponseEntity<List<PreviewItemDto>> getPreviewItems(@RequestBody SearchFilterDto searchFilterDto,
			@RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {

		Double latitude = null;
		Double longitude = null;
		String country = null;

		if (searchFilterDto.locationId() != null) {
			var location = locationService.findLocation(searchFilterDto.locationId());
			if (location.isEmpty()) {
				return ResponseEntity.status(500).build();
			}
			latitude = location.get().latitude();
			longitude = location.get().longitude();
			country = location.get().countryCode();
		}

		List<ItemDbo> result;

		switch (searchFilterDto.sorting()) {
			case OLDEST -> {
				result = itemService.findItemsByUpdateTimeAsc(searchFilterDto, longitude, latitude, country, page, pageSize);
			}
			case PRICE_ASC -> {
				result = itemService.findItemsByPriceAsc(searchFilterDto, longitude, latitude, country, page, pageSize);
			}
			case PRICE_DESC -> {
				result = itemService.findItemsByPriceDesc(searchFilterDto, longitude, latitude, country, page, pageSize);
			}
			default -> {
				result = itemService.findItemsByUpdateTimeDesc(searchFilterDto, longitude, latitude, country, page, pageSize);
			}
		}

		List<PreviewItemDto> previewItems = result.stream()
				.map(item -> {
					var location = locationService.findLocation(item.locationId());
					return new PreviewItemDto(
							item.name(),
							location.map(LocationDbo::postalCode).orElse(""),
							location.map(LocationDbo::city).orElse(""),
							item.price(),
							item.currency()
					);
				})
				.toList();

		return ResponseEntity.ok(previewItems);
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		try {
			var itemDbo = itemService.findItem(id);

			if (itemDbo.isEmpty()) {
				return ResponseEntity.notFound().build();
			}

			var locationDbo = locationService.findLocation(itemDbo.get().locationId());

			// Ths is the same situation as above and this should never happen
			if (locationDbo.isEmpty()) {
				log.error("Location with ID {} not found in item with ID {}", itemDbo.get().locationId(),
						itemDbo.get().id());
				return ResponseEntity.status(500).build();
			}

			return ResponseEntity.ok(combineLocationAndUserWithItem(itemDbo.get(), locationDbo.get()));
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@PostMapping("/item")
	public ResponseEntity<Long> createItem(@RequestBody CreateItemDto createItemDto, HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);

			var userAuthDetails = tokenService.getUserDetails(token);
			var location = locationService.findLocation(createItemDto.locationId());

			if (location.isEmpty()) {
				return ResponseEntity.status(500).build();
			}

			var itemId = itemService.insertItem(createItemDto, userAuthDetails.getUserId(),
					location.get().longitude(),
					location.get().latitude(), location.get().countryCode());
			return ResponseEntity.status(201).body(itemId);
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@PutMapping("/item/{id}")
	public ResponseEntity<String> updateItem(@PathVariable("id") Long id, @RequestBody UpdateItemDto updateItemDto,
			HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);
			var userAuthDetails = tokenService.getUserDetails(token);
			if (!Objects.equals(userAuthDetails.getUserId(), id)) {
				return ResponseEntity.status(401).build();
			}

			Double latitude = null;
			Double longitude = null;
			String country = null;

			if (updateItemDto.locationId() != null) {

				var location = locationService.findLocation(updateItemDto.locationId());
				if (location.isEmpty()) {
					return ResponseEntity.notFound().build();
				}

				latitude = location.get().latitude();
				longitude = location.get().longitude();
				country = location.get().countryCode();
			}

			itemService.updateItem(updateItemDto, id, country, longitude, latitude);

			return ResponseEntity.status(201).build();
		} catch (Exception e) {
			log.error("Error while updating item with ID {}", id, e);
			return ResponseEntity.status(500).build();
		}
	}

	private ItemFullDetailsDto combineLocationAndUserWithItem(ItemDbo itemDbo, LocationDbo locationDbo) {
		var location = LOCATION_MAPPER.from(locationDbo);
		return new ItemFullDetailsDto(
				itemDbo.name(),
				itemDbo.description(),
				itemDbo.imageUrl(),
				itemDbo.price(),
				itemDbo.currency(),
				"", // TODO: Add username lookup
				itemDbo.email(),
				itemDbo.phoneNumber(),
				location.getCountryCode(),
				location.toString(),
				itemDbo.createdAt(),
				itemDbo.updatedAt()
		);
	}
}
