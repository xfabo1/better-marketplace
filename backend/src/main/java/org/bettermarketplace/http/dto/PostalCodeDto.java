package org.bettermarketplace.http.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record PostalCodeDto(
		@JsonProperty("country_code")
		String countryCode,
		@JsonProperty("postal_code")
		String postalCode,
		@JsonProperty("place_name")
		String placeName,
		@JsonProperty("admin_name1")
		String region,
		@JsonProperty("admin_name2")
		String city,
		float latitude,
		float longitude) {
}
