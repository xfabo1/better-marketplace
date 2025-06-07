package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record CreateItemDto(
	String name,
	String description,
	Currency currency,
	BigDecimal price,
	String locationId,
	String imageUrl,
	String email,
	String phoneNumber
) {
}
