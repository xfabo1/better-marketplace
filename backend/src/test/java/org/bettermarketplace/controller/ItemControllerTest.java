package org.bettermarketplace.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.bettermarketplace.api.ItemController;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.config.ObjectMapperConfiguration;
import org.bettermarketplace.config.TestSecurityConfig;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.junit.jupiter.api.Test;
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

	@Test
	void getNewestItems_defaultPageSize_itemsReturned() throws Exception {
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
		when(itemService.findNewestItems(50)).thenReturn(List.of(item));

		var result = mockMvc.perform(get(ITEMS_PATH))
				.andExpect(status().isOk())
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
	}

	@Test
	void getNewestItems_customPageSize_passedToService() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("pageSize", "10"))
				.andExpect(status().isOk());

		verify(itemService).findNewestItems(10);
	}

	@Test
	void getNewestItems_pageSizeTooLarge_clampedToMax() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("pageSize", "1000"))
				.andExpect(status().isOk());

		verify(itemService).findNewestItems(100);
	}

	@Test
	void getNewestItems_pageSizeBelowOne_clampedToOne() throws Exception {
		mockMvc.perform(get(ITEMS_PATH).param("pageSize", "0"))
				.andExpect(status().isOk());

		verify(itemService).findNewestItems(1);
	}
}
