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

	public static FileReferenceDbo from(Long id, FileReference fileReference) {
		return FileReferenceDbo.builder()
				.id(id)
				.createdAt(fileReference.getCreatedAt())
				.updatedAt(fileReference.getUpdatedAt())
				.name(fileReference.getName())
				.type(fileReference.getType())
				.build();
	}

	public static FileReferenceDbo from(FileReferenceDbo fileReferenceDbo, RenameFileDto renameFileDto) {
		return FileReferenceDbo.builder()
				.id(fileReferenceDbo.id())
				.name(renameFileDto.name())
				.updatedAt(fileReferenceDbo.updatedAt())
				.createdAt(fileReferenceDbo.createdAt())
				.type(fileReferenceDbo.type())
				.build();
	}
}

