package org.bettermarketplace.http.dto;

public record PostalCodeDto(
		String countryCode,
		String postalCode,
		String placeName,
		float latitude,
		float longitude) {
}
