package org.bettermarketplace.dao;

import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.ItemSearchQuery;
import org.bettermarketplace.model.Sorting;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Checks how {@link ItemDao#searchItems(ItemSearchQuery)} turns the sorting into ORDER BY and the pagination cursor,
 * without a database. The SQL itself is covered by ItemSearchDaoIT.
 */
class ItemDaoSortingTest {

	private static final BigDecimal LAST_PRICE = BigDecimal.valueOf(300);
	private static final Instant LAST_UPDATED = Instant.parse("2026-01-15T10:00:00Z");

	private ItemDao itemDao;

	@BeforeEach
	void setUp() {
		itemDao = mock(ItemDao.class, CALLS_REAL_METHODS);
	}

	@Test
	void searchItems_noSorting_newestFirstWithUpdateCursor() {
		itemDao.searchItems(queryWithBothCursors(null));

		verify(itemDao).searchItems(null, null, null, null, null, null, null, LAST_UPDATED, null, null, null, 10,
				"updated_at DESC", "<=");
	}

	@Test
	void searchItems_oldest_updatedAscendingWithUpdateCursor() {
		itemDao.searchItems(queryWithBothCursors(Sorting.OLDEST));

		verify(itemDao).searchItems(null, null, null, null, null, null, null, LAST_UPDATED, null, null, null, 10,
				"updated_at ASC", ">=");
	}

	@Test
	void searchItems_priceAsc_priceAscendingWithPriceCursor() {
		itemDao.searchItems(queryWithBothCursors(Sorting.PRICE_ASC));

		verify(itemDao).searchItems(null, null, null, null, null, null, LAST_PRICE, null, null, null, null, 10,
				"price ASC", ">=");
	}

	@Test
	void searchItems_priceDesc_priceDescendingWithPriceCursor() {
		itemDao.searchItems(queryWithBothCursors(Sorting.PRICE_DESC));

		verify(itemDao).searchItems(null, null, null, null, null, null, LAST_PRICE, null, null, null, null, 10,
				"price DESC", "<=");
	}

	@Test
	void searchItems_filters_passedThrough() {
		itemDao.searchItems(ItemSearchQuery.builder()
				.longitude(16.6)
				.latitude(49.2)
				.maxMeterDistance(5000.0)
				.minPrice(100.0)
				.maxPrice(200.0)
				.textSearch("bike")
				.condition("new")
				.category("transport")
				.subcategory("cars")
				.sorting(Sorting.NEWEST)
				.pageSize(10)
				.build());

		verify(itemDao).searchItems(16.6, 49.2, 100.0, 200.0, "bike", 5000.0, null, null, "new", "transport", "cars", 10,
				"updated_at DESC", "<=");
	}

	private static ItemSearchQuery queryWithBothCursors(Sorting sorting) {
		return ItemSearchQuery.builder()
				.sorting(sorting)
				.lastPrice(LAST_PRICE)
				.lastUpdated(LAST_UPDATED)
				.pageSize(10)
				.build();
	}
}
