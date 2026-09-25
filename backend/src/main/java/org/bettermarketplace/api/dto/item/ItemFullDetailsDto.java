package org.bettermarketplace.api.dto.item;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Currency;

import lombok.Builder;

@Builder
public record ItemFullDetailsDto(
		Long id,
		String name,
		String description,
		String imageUrl,
		BigDecimal price,
		Currency currency,
		String category,
		String subcategory,
		String condition,
		String username,
		Instant sellerMemberSince,
		String email,
		String phoneNumber,
		String placeName,
		String city,
		String postalCode,
		Instant createdAt,
		Instant updatedAt
) {}
