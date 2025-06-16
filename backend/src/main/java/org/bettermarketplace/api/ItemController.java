package org.bettermarketplace.api;

import static org.bettermarketplace.api.response.ResponseStatusMessage.INTERNAL_SERVER_ERROR;
import static org.bettermarketplace.api.response.ResponseStatusMessage.UNAUTHORIZED;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.bettermarketplace.api.dto.filter.SearchFilterDto;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.api.response.ApiResponse;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.model.Sorting;
import org.bettermarketplace.security.CookieUtil;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
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
	public ApiResponse<List<PreviewItemDto>> getPreviewItems(
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

			var coordinates = getLocationCoordinates(searchFilterDto.locationId());
			if (coordinates == null) {
				return createErrorMessage();
			}

			List<PreviewItemDbo> result;

			switch (searchFilterDto.sorting()) {
				case OLDEST -> result = itemService.findItemsByUpdateTimeAsc(searchFilterDto, coordinates.longitude,
						coordinates.latitude, coordinates.country, page, pageSize);
				case PRICE_ASC -> result = itemService.findItemsByPriceAsc(searchFilterDto, coordinates.longitude,
						coordinates.latitude(), coordinates.country, page, pageSize);
				case PRICE_DESC ->
						result = itemService.findItemsByPriceDesc(searchFilterDto, coordinates.longitude,
								coordinates.latitude(), coordinates.country, page, pageSize);
				default -> result = itemService.findItemsByUpdateTimeDesc(searchFilterDto,
						coordinates.longitude(), coordinates.latitude(), coordinates.country, page, pageSize);
			}

			return ApiResponse.<List<PreviewItemDto>>builder()
					.body(result.stream().map(LOCATION_MAPPER::from).toList())
					.statusCode(200)
					.build();

		} catch (Exception e) {
			return createErrorMessage();
		}
	}

	@GetMapping("/item/{id}")
	public ApiResponse<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		var itemDbo = itemService.findItem(id);

		if (itemDbo.isEmpty()) {
			return ApiResponse.<ItemFullDetailsDto>builder()
					.statusCode(404)
					.build();
		}

		return ApiResponse.<ItemFullDetailsDto>builder()
				.body(ITEM_MAPPER.from(itemDbo.get()))
				.statusCode(200)
				.build();

	}

	@PostMapping("/item")
	public ApiResponse<Void> createItem(@RequestBody CreateItemDto createItemDto, HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);

			var userAuthDetails = tokenService.getUserDetails(token);

			var coordinates = getLocationCoordinates(createItemDto.locationId());
			if (coordinates == null) {
				return createErrorMessage();
			}

			itemService.insertItem(createItemDto, userAuthDetails.getUserId(),
					coordinates.longitude, coordinates.latitude, coordinates.country);
			return ApiResponse.<Void>builder()
					.statusCode(201)
					.build();
		} catch (Exception e) {
			log.error("Error while creating item", e);
			return createErrorMessage();
		}
	}

	@PutMapping("/item/{id}")
	public ApiResponse<Long> updateItem(@PathVariable("id") Long id, @RequestBody UpdateItemDto updateItemDto,
			HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);
			var userAuthDetails = tokenService.getUserDetails(token);
			if (!Objects.equals(userAuthDetails.getUserId(), id)) {
				return ApiResponse.<Long>builder()
						.statusCode(UNAUTHORIZED.statusCode())
						.message(UNAUTHORIZED.statusMessage())
						.build();
			}

			var coordinates = getLocationCoordinates(updateItemDto.locationId());
			if (coordinates == null) {
				return createErrorMessage();
			}

			itemService.updateItem(updateItemDto, id, coordinates.country, coordinates.longitude,
					coordinates.latitude());

			return ApiResponse.<Long>builder()
					.statusCode(200)
					.build();

		} catch (Exception e) {
			log.error("Error while updating item with ID {}", id, e);
			return createErrorMessage();
		}
	}

	private <T> ApiResponse<T> createErrorMessage() {
		return ApiResponse.<T>builder()
				.statusCode(INTERNAL_SERVER_ERROR.statusCode())
				.message(INTERNAL_SERVER_ERROR.statusMessage())
				.body(null)
				.build();
	}

	private record LocationCoordinates(Double latitude, Double longitude, String country) {}

	private LocationCoordinates getLocationCoordinates(Long locationId) {
		var location = locationService.findLocation(locationId);
		if (location.isEmpty()) {
			log.error("Location with id {} not found", locationId);
			return null;
		}

		return new LocationCoordinates(
				location.get().latitude(),
				location.get().longitude(),
				location.get().countryCode()
		);
	}
}
