package org.bettermarketplace.db.entity;

import java.time.Instant;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record UserDbo(Long id,
					  @ColumnName("created_at")
					  Instant createdAt,
					  @ColumnName("updated_at")
					  Instant updatedAt,
					  String username,
					  String email) {
}
