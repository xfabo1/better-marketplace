package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;

public record ItemFullDetailsDto(
		Long id,
		String name,
		String description,
		String imageUrl,
		String phoneNumber,
		String username,
		String email,
		BigDecimal price,
		Long userId,
		Currency currency,
		Long locationId,
		String placeName,
		String postalCode,
		Country country,
		String category,
		Instant deleted_at,
		String subcategory,
		Instant createdAt,
		Instant updatedAt,
		String condition) {}
