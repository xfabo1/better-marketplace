package org.bettermarketplace.db.entity;

import java.time.Instant;

import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.model.FileReference;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record FileReferenceDbo(Long id,
							   @ColumnName("created_at") Instant createdAt,
							   @ColumnName("updated_at") Instant updatedAt,
							   String name,
							   String type) {
}

