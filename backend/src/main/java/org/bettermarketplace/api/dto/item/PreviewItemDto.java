package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record PreviewItemDto(
		Long id,
		String name,
		BigDecimal price,
		Currency currency,
		String imageUrl,
		String condition,
		Instant createdAt
) {
}
