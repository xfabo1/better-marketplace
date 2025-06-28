package org.bettermarketplace.api;

import static org.bettermarketplace.api.response.ResponseStatusMessage.CREATED;
import static org.bettermarketplace.api.response.ResponseStatusMessage.INTERNAL_SERVER_ERROR;
import static org.bettermarketplace.api.response.ResponseStatusMessage.NOT_FOUND;
import static org.bettermarketplace.api.response.ResponseStatusMessage.UNAUTHORIZED;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.bettermarketplace.api.dto.filter.SearchFilterDto;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.PreviewItemsDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.api.response.ApiResponse;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.model.Currency;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	public ResponseEntity<ApiResponse<PreviewItemsDto>> getPreviewItems(
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
				case PRICE_DESC -> result = itemService.findItemsByPriceDesc(searchFilterDto, coordinates.longitude,
						coordinates.latitude(), coordinates.country, page, pageSize);
				default -> result = itemService.findItemsByUpdateTimeDesc(searchFilterDto,
						coordinates.longitude(), coordinates.latitude(), coordinates.country, page, pageSize);
			}

			int totalItems = itemService.getCountOfAllItems(searchFilterDto, coordinates.latitude(),
					coordinates.longitude, coordinates.country);

			var previewItems = PreviewItemsDto.builder()
					.totalItems(totalItems)
					.previewItemDtos(result.stream().map(LOCATION_MAPPER::from).toList())
					.build();

			return ResponseEntity.ok(ApiResponse.<PreviewItemsDto>builder()
					.body(previewItems).build());

		} catch (Exception e) {
			return createErrorMessage();
		}
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ApiResponse<ItemFullDetailsDto>> getItemById(@PathVariable("id") Long id) {
		var itemDbo = itemService.findItem(id);

		return itemDbo.map(dbo -> ResponseEntity.ok(ApiResponse.<ItemFullDetailsDto>builder()
				.body(ITEM_MAPPER.from(dbo))
				.build())).orElseGet(() -> ResponseEntity.status(NOT_FOUND.statusCode()).body(null));

	}

	@PostMapping("/item")
	public ResponseEntity<ApiResponse<Void>> createItem(
			@RequestParam("title") String title,
			@RequestParam("price") BigDecimal price,
			@RequestParam("currency") Currency currency,
			@RequestParam("description") String description,
			@RequestParam("locationId") Long locationId,
			@RequestParam("email") String email,
			@RequestParam("phoneNumber") String phoneNumber,
			@RequestParam("category") String category,
			@RequestParam("subcategory") String subcategory,
			@RequestParam("condition") String condition,
			@RequestParam(value = "images", required = false) MultipartFile[] images,
			HttpServletRequest request
	) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);

			var userAuthDetails = tokenService.getUserDetails(token);
			CreateItemDto createItemDto = CreateItemDto.builder()
					.title(title)
					.price(price)
					.currency(currency)
					.description(description)
					.locationId(locationId)
					.email(email)
					.phoneNumber(phoneNumber)
					.category(category)
					.subcategory(subcategory)
					.condition(condition)
					.build();

			var coordinates = getLocationCoordinates(createItemDto.locationId());
			if (coordinates == null) {
				return createErrorMessage();
			}

			itemService.insertItem(createItemDto, userAuthDetails.getUserId(),
					coordinates.longitude, coordinates.latitude, coordinates.country);

			return ResponseEntity.status(CREATED.statusCode()).body(ApiResponse.<Void>builder().build());
		} catch (Exception e) {
			log.error("Error while creating item", e);
			return createErrorMessage();
		}
	}

	@PutMapping("/item/{id}")
	public ResponseEntity<ApiResponse<Void>> updateItem(
			@PathVariable("id") Long id,
			@RequestParam("title") String title,
			@RequestParam("price") BigDecimal price,
			@RequestParam("currency") Currency currency,
			@RequestParam("description") String description,
			@RequestParam("locationId") Long locationId,
			@RequestParam("email") String email,
			@RequestParam("phoneNumber") String phoneNumber,
			@RequestParam("category") String category,
			@RequestParam("subcategory") String subcategory,
			@RequestParam("condition") String condition,
			@RequestParam(value = "images", required = false) MultipartFile[] images,
			HttpServletRequest request
	) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);
			var userAuthDetails = tokenService.getUserDetails(token);
			if (!Objects.equals(userAuthDetails.getUserId(), id)) {
				return ResponseEntity.status(UNAUTHORIZED.statusCode())
						.body(ApiResponse.<Void>builder()
								.message(UNAUTHORIZED.statusMessage())
								.build());
			}

			UpdateItemDto updateItemDto = UpdateItemDto.builder()
					.title(title)
					.price(price)
					.currency(currency)
					.description(description)
					.locationId(locationId)
					.email(email)
					.phoneNumber(phoneNumber)
					.category(category)
					.subcategory(subcategory)
					.condition(condition)
					.build();

			var coordinates = getLocationCoordinates(updateItemDto.locationId());
			if (coordinates == null) {
				return createErrorMessage();
			}

			itemService.updateItem(updateItemDto, id, coordinates.country(), coordinates.longitude(),
					coordinates.latitude());

			return ResponseEntity.ok(ApiResponse.<Void>builder().build());

		} catch (Exception e) {
			log.error("Error while updating item with ID {}", id, e);
			return createErrorMessage();
		}
	}

	private <T> ResponseEntity<ApiResponse<T>> createErrorMessage() {
		var response = ApiResponse.<T>builder()
				.message(INTERNAL_SERVER_ERROR.statusMessage())
				.body(null)
				.build();
		return ResponseEntity.status(INTERNAL_SERVER_ERROR.statusCode()).body(response);
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
