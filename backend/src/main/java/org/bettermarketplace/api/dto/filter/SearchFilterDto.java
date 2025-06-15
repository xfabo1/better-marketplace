package org.bettermarketplace.api.dto.filter;

import java.time.Instant;

import org.bettermarketplace.model.Sorting;

public record SearchFilterDto(
		Long locationId,
		Double minPrice,
		Double maxPrice,
		Instant dateAdded,
		String condition,
		String searchText,
		Sorting sorting,
		Double maxMeterDistance) {
}
