package org.bettermarketplace.api;

import java.util.List;
import java.util.Objects;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Sorting;
import org.bettermarketplace.security.CookieUtil;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
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
	private static final int MAX_PAGE_SIZE = 100;

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

	@GetMapping
	public List<PreviewItemDto> searchItems(
			@RequestParam(value = "q", required = false) String searchText,
			@RequestParam(value = "minPrice", required = false) Double minPrice,
			@RequestParam(value = "maxPrice", required = false) Double maxPrice,
			@RequestParam(value = "condition", required = false) String condition,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "pageSize", defaultValue = "50") int pageSize) {
		var filter = SearchFilter.builder()
				.searchText(StringUtils.hasText(searchText) ? searchText.trim() : null)
				.minPrice(minPrice)
				.maxPrice(maxPrice)
				.condition(StringUtils.hasText(condition) ? condition : null)
				.sorting(Sorting.fromString(sort).orElse(Sorting.NEWEST))
				.build();

		return itemService.findItems(filter, Math.clamp(pageSize, 1, MAX_PAGE_SIZE)).stream()
				.map(ITEM_MAPPER::toPreview)
				.toList();
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		try {
			var itemDbo = itemService.findItem(id);

			if (itemDbo.isEmpty()) {
				return ResponseEntity.notFound().build();
			}

			var locationDbo = locationService.findLocation(itemDbo.get().locationId());

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

			var itemId = itemService.insertItem(createItemDto, userAuthDetails.getUserId(), location.get().longitude(),
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
			var item = itemService.findItem(id);
			if (item.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			if (!Objects.equals(userAuthDetails.getUserId(), item.get().userId())) {
				return ResponseEntity.status(403).build();
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
		return ItemFullDetailsDto.builder()
				.name(itemDbo.name())
				.price(itemDbo.price())
				.currency(itemDbo.currency())
				.description(itemDbo.description())
				.imageUrl(itemDbo.imageUrl())
				.email(itemDbo.email())
				.locationName(location.toString())
				.country(location.getCountryCode())
				.createdAt(itemDbo.createdAt())
				.updatedAt(itemDbo.updatedAt())
				.phoneNumber(itemDbo.phoneNumber())
				.build();
	}
}
