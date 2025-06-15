package org.bettermarketplace.api.dto.filter;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Sorting;

import lombok.Builder;

@Builder
public record SearchFilterDto(
		Long locationId,
		Double minPrice,
		Double maxPrice,
		Instant dateAdded,
		String condition,
		String searchText,
		Sorting sorting,
		Double maxMeterDistance,
	    BigDecimal lastPrice,
		Instant lastUpdate) {
}
