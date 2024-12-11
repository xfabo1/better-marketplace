package org.bettermarketplace.api.dto;

import java.time.Instant;

import org.bettermarketplace.db.entity.FileReferenceDbo;

public record OpenedFileDto(Long id, String name, String type, Instant createdAt, Instant updatedAt, byte[] content) {

    public static OpenedFileDto from(FileReferenceDbo fileReference, byte[] content) {
        return new OpenedFileDto(
                fileReference.id(),
                fileReference.name(),
                fileReference.type(),
                fileReference.createdAt(),
                fileReference.updatedAt(),
                content);
    }
}
