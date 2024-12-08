package org.bettermarketplace.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bettermarketplace.db.entity.FileReference;

@Data
@EqualsAndHashCode(callSuper = true)
public class OpenedFileDto extends FileReference {

    private byte[] content;

    public static OpenedFileDto from(FileReference fileReference, byte[] content) {
        OpenedFileDto openedFileDto = new OpenedFileDto();
        openedFileDto.setId(fileReference.getId());
        openedFileDto.setType(fileReference.getType());
        openedFileDto.setCreated(fileReference.getCreated());
        openedFileDto.setUpdated(fileReference.getUpdated());
        openedFileDto.setName(fileReference.getName());
        openedFileDto.setContent(content);
        return openedFileDto;
    }
}
