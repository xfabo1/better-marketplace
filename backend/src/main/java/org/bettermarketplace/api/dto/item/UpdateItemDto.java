package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record UpdateItemDto(
		String title,
		String description,
		Currency currency,
		BigDecimal price,
		Long locationId,
		String email,
		String phoneNumber,
		String category,
		String subcategory,
		String condition) {
}
