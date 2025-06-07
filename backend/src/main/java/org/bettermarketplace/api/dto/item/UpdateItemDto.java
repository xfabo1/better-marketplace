package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record UpdateItemDto(
		String name,
		String description,
		Currency currency,
		BigDecimal price,
		String location,
		String imageStorageUrl,
		String email,
		String phoneNumber) {
}
