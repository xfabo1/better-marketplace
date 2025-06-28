package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;

public record ItemFullDetailsDto(
		Long id,
		String title,
		String description,
		List<String> imageUrl,
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
		String subcategory,
		Instant createdAt,
		Instant updatedAt,
		String condition) {}
