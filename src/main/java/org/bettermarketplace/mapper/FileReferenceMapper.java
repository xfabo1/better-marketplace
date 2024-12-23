package org.bettermarketplace.mapper;

import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.model.FileReference;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FileReferenceMapper {

	FileReferenceMapper INSTANCE = Mappers.getMapper(FileReferenceMapper.class);

	@Mapping(target = "id", source = "id")
	@Mapping(target = "createdAt", source = "fileReference.createdAt")
	@Mapping(target = "updatedAt", source = "fileReference.updatedAt")
	@Mapping(target = "name", source = "fileReference.name")
	@Mapping(target = "type", source = "fileReference.type")
	FileReferenceDbo from(Long id, FileReference fileReference);

	@Mapping(target = "id", source = "fileReferenceDbo.id")
	@Mapping(target = "name", source = "renameFileDto.name")
	@Mapping(target = "updatedAt", source = "fileReferenceDbo.updatedAt")
	@Mapping(target = "createdAt", source = "fileReferenceDbo.createdAt")
	@Mapping(target = "type", source = "fileReferenceDbo.type")
	FileReferenceDbo from(FileReferenceDbo fileReferenceDbo, RenameFileDto renameFileDto);
}
