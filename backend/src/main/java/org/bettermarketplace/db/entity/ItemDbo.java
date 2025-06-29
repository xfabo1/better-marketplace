package org.bettermarketplace.db.entity;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record ItemDbo(
		Long id,
		String title,
		String description,
		String imageUrl,
		@ColumnName("phone_number")
		String phoneNumber,
		String username,
		String email,
		BigDecimal price,
		@ColumnName("user_id")
		Long userId,
		Currency currency,
		@ColumnName("location_id")
		Long locationId,
		@ColumnName("place_name")
		String placeName,
		@ColumnName("postal_code")
		String postalCode,
		Country country,
		String category,
		Instant deleted_at,
		String subcategory,
		@ColumnName("created_at")
		Instant createdAt,
		@ColumnName("updated_at")
		Instant updatedAt,
		String condition) {}
