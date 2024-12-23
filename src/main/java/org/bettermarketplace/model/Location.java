package org.bettermarketplace.model;

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
}
