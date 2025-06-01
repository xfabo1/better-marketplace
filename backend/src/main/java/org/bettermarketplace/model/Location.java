package org.bettermarketplace.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@AllArgsConstructor
@EqualsAndHashCode
public class Location {

	private String placeName;
	private String postalCode;
	private Country countryCode;
	private String city;
	private String region;
	private float latitude;
    private float longitude;

	@Override
	public String toString() {
		return countryCode + ", " + placeName + ", " + city + ", " + region + ", " + postalCode;
	}
}
