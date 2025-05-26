package org.bettermarketplace.mapper;

import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.http.dto.PostalCodeDto;
import org.bettermarketplace.model.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LocationMapper {

	LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

	@Mapping(source = "placeName", target = "name")
	Location from(PostalCodeDto postalCodeDto);
}
