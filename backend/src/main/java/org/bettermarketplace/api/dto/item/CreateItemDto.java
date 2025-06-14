package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record CreateItemDto(
	String name,
	String description,
	Currency currency,
	BigDecimal price,
	Long locationId,
	String imageUrl,
	String email,
	String phoneNumber,
	String category,
	String subcategory,
	String condition) {
}
