package org.bettermarketplace.model;

import org.bettermarketplace.db.entity.LocationDbo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Location {

	private String postalCode;
	private String countryCode;
	private float latitude;
    private float longitude;

	public static Location from(LocationDbo locationDbo) {
		return Location.builder()
				.postalCode(locationDbo.id())
				.countryCode(locationDbo.countryCode())
				.latitude(locationDbo.latitude())
				.longitude(locationDbo.longitude())
				.build();
	}
}
