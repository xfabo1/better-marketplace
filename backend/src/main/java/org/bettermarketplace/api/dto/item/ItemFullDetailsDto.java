package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record ItemFullDetailsDto(
		Long id,
		String description,
		String imageUrl,
		BigDecimal price,
		Currency currency,
		String username,
		String email,
		String phoneNumber,
		String postalCode,
		Country country,
		String locationName,
		Instant createdAt
) {}