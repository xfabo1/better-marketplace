package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record CreateItemDto(
	String title,
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
