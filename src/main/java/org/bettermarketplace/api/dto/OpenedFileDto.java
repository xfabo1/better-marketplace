package org.bettermarketplace.api.dto;

import java.time.Instant;

import org.bettermarketplace.db.entity.FileReference;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OpenedFileDto {

    private Long id;
    private String name;
    private String type;
    private Instant createdAt;
    private Instant updatedAt;
    private byte[] content;

    public static OpenedFileDto from(FileReference fileReference, byte[] content) {
        OpenedFileDto openedFileDto = new OpenedFileDto();
        openedFileDto.setId(fileReference.getId());
        openedFileDto.setType(fileReference.getType());
        openedFileDto.setCreatedAt(fileReference.getCreatedAt());
        openedFileDto.setUpdatedAt(fileReference.getUpdatedAt());
        openedFileDto.setName(fileReference.getName());
        openedFileDto.setContent(content);
        return openedFileDto;
    }
}
