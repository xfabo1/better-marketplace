package org.bettermarketplace.db.entity;

import java.math.BigDecimal;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record PreviewItemDbo(
		String name,
		Country country,
		@ColumnName("postal_code")
		String postalCode,
		@ColumnName("place_name")
		String placeName,
		BigDecimal price,
		Currency currency,
		String category,
		String condition
) {
}
