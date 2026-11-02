package org.bettermarketplace.db.dao;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Sorting;

import lombok.Builder;

/**
 * Filters for {@link ItemDao#searchItems}. Every field is optional except {@code pageSize}.
 *
 * @param longitude        together with latitude and maxMeterDistance, limits results to that radius
 * @param lastPrice        pagination cursor for the price sortings: the price of the last item on the previous page
 * @param lastUpdated      pagination cursor for the newest/oldest sortings: updatedAt of the last item on the previous
 *                         page
 */
@Builder
public record ItemSearchQuery(
		Double longitude,
		Double latitude,
		Double maxMeterDistance,
		Double minPrice,
		Double maxPrice,
		String textSearch,
		String condition,
		String category,
		String subcategory,
		Sorting sorting,
		BigDecimal lastPrice,
		Instant lastUpdated,
		int pageSize) {
}
