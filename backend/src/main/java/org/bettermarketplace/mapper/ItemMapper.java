package org.bettermarketplace.mapper;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.model.Item;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ItemMapper {

	ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

	@Mapping(target = "creatorId", source = "userIdParam")
	Item from(CreateItemDto createItemDto, Long userIdParam);
	ItemFullDetailsDto from(ItemDbo itemDbo);
	PreviewItemDto from(PreviewItemDbo previewItemDbo);
}
