package org.bettermarketplace.db.entity;

import org.bettermarketplace.http.dto.PostalCodeDto;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record LocationDbo(String id,
						  @ColumnName("country_code")
						  String countryCode,
						  String name,
						  float latitude,
						  float longitude) {

	public static LocationDbo from(PostalCodeDto postalCodeDto) {
		return LocationDbo.builder()
				.id(postalCodeDto.postalCode())
				.countryCode(postalCodeDto.countryCode())
				.name(postalCodeDto.placeName())
				.latitude(postalCodeDto.latitude())
				.longitude(postalCodeDto.longitude())
				.build();
	}
}
