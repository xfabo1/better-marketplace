package org.bettermarketplace.db.entity;

import java.math.BigDecimal;
import java.time.Instant;

import org.bettermarketplace.model.Currency;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record ItemDbo(
		Long id,
		String name,
		String description,
		String imageUrl,
		String email,
		@ColumnName("phone_number")
		String phoneNumber,
		BigDecimal price,
		@ColumnName("marketplace_user_id")
		Long userId,
		Currency currency,
		@ColumnName("location_id")
		Long locationId,
		String category,
		String subcategory,
		@ColumnName("created_at")
		Instant createdAt,
		@ColumnName("updated_at")
		Instant updatedAt,
		@ColumnName("deleted_at")
		Instant deletedAt) {
}
