package org.bettermarketplace.db.entity;

import java.time.Instant;

import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.model.FileReference;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

public record FileReferenceDbo(Long id,
							   @ColumnName("created_at") Instant createdAt,
							   @ColumnName("updated_at") Instant updatedAt,
							   String name,
							   String type) {

	public static FileReferenceDbo from(Long id, FileReference fileReference) {
		return new FileReferenceDbo(id, fileReference.getCreatedAt(), fileReference.getUpdatedAt(), fileReference.getName(),
				fileReference.getType());
	}

	public static FileReferenceDbo from(FileReferenceDbo fileReferenceDbo, RenameFileDto renameFileDto) {
		return new FileReferenceDbo(fileReferenceDbo.id(), fileReferenceDbo.createdAt, fileReferenceDbo.updatedAt,
				renameFileDto.name(), fileReferenceDbo.type);
	}
}

