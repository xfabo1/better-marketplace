package org.bettermarketplace.service;

import static org.mockito.Mockito.verify;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.ItemSearchQuery;
import org.bettermarketplace.model.Sorting;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

	private static final double BRNO_LONGITUDE = 16.6068;
	private static final double BRNO_LATITUDE = 49.1951;

	@Mock
	private ItemDao itemDao;

	@InjectMocks
	private ItemService itemService;

	@Test
	void insertItem_coordinates_passedToDaoInItsOrder() {
		var dto = CreateItemDto.builder().name("Bike").build();

		itemService.insertItem(dto, 1L, BRNO_LONGITUDE, BRNO_LATITUDE, "CZ");

		verify(itemDao).insertItem(dto, 1L, BRNO_LATITUDE, BRNO_LONGITUDE, "CZ");
	}

	@Test
	void findItems_filter_mappedToSearchQuery() {
		var lastUpdate = Instant.parse("2026-01-15T10:00:00Z");
		var filter = SearchFilter.builder()
				.searchText("bike")
				.minPrice(100.0)
				.maxPrice(2000.0)
				.condition("new")
				.maxMeterDistance(5000.0)
				.sorting(Sorting.PRICE_DESC)
				.lastPrice(BigDecimal.TEN)
				.lastUpdate(lastUpdate)
				.build();

		itemService.findItems(filter, 20);

		verify(itemDao).searchItems(ItemSearchQuery.builder()
				.textSearch("bike")
				.minPrice(100.0)
				.maxPrice(2000.0)
				.condition("new")
				.maxMeterDistance(5000.0)
				.sorting(Sorting.PRICE_DESC)
				.lastPrice(BigDecimal.TEN)
				.lastUpdated(lastUpdate)
				.pageSize(20)
				.build());
	}
}
