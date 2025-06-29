package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;

public record PreviewItemDto(
		String title,
		Country country,
		String imageUrl,
		String postalCode,
		String placeName,
		BigDecimal price,
		Currency currency,
		String category,
		String condition
) {
}
