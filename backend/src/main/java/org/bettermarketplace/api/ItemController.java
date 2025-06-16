package org.bettermarketplace.api;

import java.time.Instant;
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
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.model.Sorting;
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
	public ResponseEntity<List<PreviewItemDto>> getPreviewItems(
			@RequestParam("page") int page, 
			@RequestParam("pageSize") int pageSize,
			@RequestParam(value = "locationId", required = false) Long locationId,
			@RequestParam(value = "minPrice", required = false) Double minPrice,
			@RequestParam(value = "maxPrice", required = false) Double maxPrice,
			@RequestParam(value = "dateAdded", required = false) String dateAdded,
			@RequestParam(value = "condition", required = false) String condition,
			@RequestParam(value = "searchText", required = false) String searchText,
			@RequestParam(value = "sorting", required = false, defaultValue = "NEWEST") String sorting,
			@RequestParam(value = "maxMeterDistance", required = false) Double maxMeterDistance) {

		try {
			var searchFilterDto = new SearchFilterDto(
				locationId,
				minPrice,
				maxPrice,
				dateAdded != null ? Instant.parse(dateAdded) : null,
				condition,
				searchText,
				Sorting.valueOf(sorting),
				maxMeterDistance
			);

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

			List<PreviewItemDbo> result;

			switch (searchFilterDto.sorting()) {
				case OLDEST -> {
					result = itemService.findItemsByUpdateTimeAsc(searchFilterDto, longitude, latitude, country, page,
							pageSize);
				}
				case PRICE_ASC -> {
					result = itemService.findItemsByPriceAsc(searchFilterDto, longitude, latitude, country, page,
							pageSize);
				}
				case PRICE_DESC -> {
					result = itemService.findItemsByPriceDesc(searchFilterDto, longitude, latitude, country, page,
							pageSize);
				}
				default -> {
					result = itemService.findItemsByUpdateTimeDesc(searchFilterDto, longitude, latitude, country, page,
							pageSize);
				}
			}

			return ResponseEntity.ok(result.stream().map(LOCATION_MAPPER::from).toList());
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		var itemDbo = itemService.findItem(id);

		return itemDbo.map(dbo -> ResponseEntity.ok(ITEM_MAPPER.from(dbo)))
				.orElseGet(() -> ResponseEntity.notFound().build());
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
}
