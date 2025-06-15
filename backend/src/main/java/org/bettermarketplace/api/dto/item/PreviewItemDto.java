package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;

public record PreviewItemDto(
		String name,
		Country country,
		String postalCode,
		String placeName,
		BigDecimal price,
		Currency currency
) {
}
