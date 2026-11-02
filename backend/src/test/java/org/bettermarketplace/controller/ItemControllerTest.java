package org.bettermarketplace.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.ItemController;
import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.config.ObjectMapperConfiguration;
import org.bettermarketplace.config.TestSecurityConfig;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.model.Sorting;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.bettermarketplace.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ItemController.class)
@Import({ObjectMapperConfiguration.class, TestSecurityConfig.class})
public class ItemControllerTest {

	private static final String ITEMS_PATH = "/v1/items";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockitoBean
	private ItemService itemService;
	@MockitoBean
	private LocationService locationService;
	@MockitoBean
	private TokenService tokenService;
	@MockitoBean
	private UserService userService;

	@Test
	void getItemById_existingItem_detailsWithLocationAndSellerReturned() throws Exception {
		var createdAt = Instant.parse("2026-01-15T10:00:00Z");
		var memberSince = Instant.parse("2025-03-01T08:00:00Z");
		when(itemService.findItem(7L)).thenReturn(Optional.of(ItemDbo.builder()
				.id(7L)
				.name("Bike")
				.price(new BigDecimal("1500"))
				.currency(Currency.CZK)
				.category("transport")
				.subcategory("bicycles")
				.condition("used_good")
				.email("seller@example.com")
				.phoneNumber("+420 601 111 111")
				.userId(3L)
				.locationId(11L)
				.createdAt(createdAt)
				.build()));
		when(locationService.findLocation(11L)).thenReturn(Optional.of(LocationDbo.builder()
				.id(11L)
				.countryCode("CZ")
				.placeName("Brno-Trnitá")
				.city("Brno-město")
				.postalCode("602 00")
				.build()));
		when(userService.getUser(3L)).thenReturn(Optional.of(UserDbo.builder()
				.id(3L)
				.username("petr_svoboda")
				.createdAt(memberSince)
				.build()));

		mockMvc.perform(get(ITEMS_PATH + "/item/7"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(7))
				.andExpect(jsonPath("$.category").value("transport"))
				.andExpect(jsonPath("$.subcategory").value("bicycles"))
				.andExpect(jsonPath("$.condition").value("used_good"))
				.andExpect(jsonPath("$.username").value("petr_svoboda"))
				.andExpect(jsonPath("$.sellerMemberSince").value("2025-03-01T08:00:00Z"))
				.andExpect(jsonPath("$.email").value("seller@example.com"))
				.andExpect(jsonPath("$.phoneNumber").value("+420 601 111 111"))
				.andExpect(jsonPath("$.placeName").value("Brno-Trnitá"))
				.andExpect(jsonPath("$.city").value("Brno-město"))
				.andExpect(jsonPath("$.postalCode").value("602 00"))
				.andExpect(jsonPath("$.createdAt").value("2026-01-15T10:00:00Z"));
	}

	@Test
	void searchItems_noParams_newestItemsReturned() throws Exception {
		var createdAt = Instant.parse("2026-01-15T10:00:00Z");
		var item = ItemDbo.builder()
				.id(7L)
				.name("Bike")
				.price(new BigDecimal("1500"))
				.currency(Currency.CZK)
				.imageUrl("https://example.com/bike.png")
				.condition("used_good")
				.createdAt(createdAt)
				.build();
		when(itemService.findItems(any(), eq(50))).thenReturn(List.of(item));

		var result = mockMvc.perform(get(ITEMS_PATH))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].createdAt").value("2026-01-15T10:00:00Z"))
				.andReturn()
				.getResponse()
				.getContentAsString();
		var items = objectMapper.readValue(result, new TypeReference<List<PreviewItemDto>>() {});

		assertThat(items).singleElement()
				.returns(7L, PreviewItemDto::id)
				.returns("Bike", PreviewItemDto::name)
				.returns(Currency.CZK, PreviewItemDto::currency)
				.returns("used_good", PreviewItemDto::condition)
				.returns(createdAt, PreviewItemDto::createdAt);
		assertThat(capturedFilter().sorting()).isEqualTo(Sorting.NEWEST);
	}

	@Test
	void searchItems_allFilters_passedToService() throws Exception {
		mockMvc.perform(get(ITEMS_PATH)
						.param("q", "  bike  ")
						.param("minPrice", "100")
						.param("maxPrice", "2000")
						.param("condition", "used_good")
						.param("category", "transport")
						.param("subcategory", "cars")
						.param("sort", "price_asc"))
				.andExpect(status().isOk());

		assertThat(capturedFilter())
				.returns("bike", SearchFilter::searchText)
				.returns(100.0, SearchFilter::minPrice)
				.returns(2000.0, SearchFilter::maxPrice)
				.returns("used_good", SearchFilter::condition)
				.returns("transport", SearchFilter::category)
				.returns("cars", SearchFilter::subcategory)
				.returns(Sorting.PRICE_ASC, SearchFilter::sorting);
	}

	@Test
	void searchItems_blankAndUnknownValues_ignored() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("q", " ").param("condition", "").param("sort", "nonsense"))
				.andExpect(status().isOk());

		assertThat(capturedFilter())
				.returns(null, SearchFilter::searchText)
				.returns(null, SearchFilter::condition)
				.returns(Sorting.NEWEST, SearchFilter::sorting);
	}

	@Test
	void searchItems_pageSizeTooLarge_clampedToMax() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("pageSize", "1000"))
				.andExpect(status().isOk());

		verify(itemService).findItems(any(), eq(100));
	}

	@Test
	void searchItems_pageSizeBelowOne_clampedToOne() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("pageSize", "0"))
				.andExpect(status().isOk());

		verify(itemService).findItems(any(), eq(1));
	}

	private SearchFilter capturedFilter() {
		var captor = ArgumentCaptor.forClass(SearchFilter.class);
		verify(itemService).findItems(captor.capture(), anyInt());
		return captor.getValue();
	}
}
