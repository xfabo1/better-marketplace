package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record PreviewItemDto(
		String name,
		String postalCode,
		String city,
		BigDecimal price,
		Currency currency
) {
}
