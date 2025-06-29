package org.bettermarketplace.db.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

import lombok.Builder;

@Builder
public record LocationDbo(Long id,
						  @ColumnName("postal_code")
						  String postalCode,
						  @ColumnName("country_code")
						  String countryCode,
						  @ColumnName("place_name")
						  String placeName,
						  String region,
						  String city,
						  double latitude,
						  double longitude) {

	@Override
	public String toString() {
		return countryCode + ", " + placeName + ", " + city + ", " + region + ", " + postalCode;
	}
}
