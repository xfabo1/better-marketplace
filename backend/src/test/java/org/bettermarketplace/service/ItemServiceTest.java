package org.bettermarketplace.service;

import static org.mockito.Mockito.verify;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
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
	void findItems_noSorting_newestFirst() {
		itemService.findItems(SearchFilter.builder().build(), 20);

		verify(itemDao).findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, null, null, 20);
	}

	@Test
	void findItems_oldest_updateTimeAscending() {
		itemService.findItems(SearchFilter.builder().sorting(Sorting.OLDEST).build(), 20);

		verify(itemDao).findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, null, null, 20);
	}

	@Test
	void findItems_priceDescWithFilters_filtersPassedToPriceQuery() {
		var filter = SearchFilter.builder()
				.sorting(Sorting.PRICE_DESC)
				.searchText("bike")
				.minPrice(100.0)
				.maxPrice(2000.0)
				.condition("new")
				.build();

		itemService.findItems(filter, 20);

		verify(itemDao).findItemsByPriceDesc(null, null, 100.0, 2000.0, null, "bike", null, null, null, "new", 20);
	}

	@Test
	void findItems_priceAsc_priceAscendingQuery() {
		itemService.findItems(SearchFilter.builder().sorting(Sorting.PRICE_ASC).build(), 20);

		verify(itemDao).findItemsByPriceAsc(null, null, null, null, null, null, null, null, null, null, 20);
	}
}
