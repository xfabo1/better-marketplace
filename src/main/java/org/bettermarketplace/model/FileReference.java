package org.bettermarketplace.model;

import java.time.Instant;

import org.bettermarketplace.db.entity.FileReferenceDbo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FileReference {

	private Instant createdAt;
	private Instant updatedAt;
	private String type;
	private String name;

	public static FileReference from(FileReferenceDbo fileReferenceDbo) {
		return FileReference.builder()
				.createdAt(fileReferenceDbo.createdAt())
				.updatedAt(fileReferenceDbo.updatedAt())
				.type(fileReferenceDbo.type())
				.name(fileReferenceDbo.name())
				.build();
	}
}
