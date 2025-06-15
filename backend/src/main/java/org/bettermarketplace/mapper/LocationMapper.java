package org.bettermarketplace.mapper;

import org.bettermarketplace.api.dto.item.PreviewItemDto;
import org.bettermarketplace.api.dto.location.LocationDto;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.http.dto.PostalCodeDto;
import org.bettermarketplace.model.Location;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LocationMapper {

	LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

	Location from(PostalCodeDto postalCodeDto);
	Location from(LocationDbo locationDbo);
	PreviewItemDto from(PreviewItemDbo previewItemDbo);
}
