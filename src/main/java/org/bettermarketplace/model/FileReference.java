package org.bettermarketplace.model;

import java.time.Instant;

import org.bettermarketplace.db.entity.FileReferenceDbo;

import lombok.Data;

@Data
public class FileReference {

	private Long id;
	private Instant createdAt;
	private Instant updatedAt;
	private String type;
	private String name;

	public static FileReference from(FileReferenceDbo fileReferenceDbo) {
		FileReference fileReference = new FileReference();
		fileReference.setId(fileReferenceDbo.id());
		fileReference.setName(fileReferenceDbo.name());
		fileReference.setType(fileReferenceDbo.type());
		fileReference.setCreatedAt(fileReferenceDbo.createdAt());
		fileReference.setUpdatedAt(fileReferenceDbo.updatedAt());
		return fileReference;
	}
}
