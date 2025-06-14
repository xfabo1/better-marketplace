package org.bettermarketplace.model;

import java.util.Arrays;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Country {
	SK, CZ;

	@JsonCreator
	public static Optional<Country> fromString(String value) {
		if (value == null) {
			return Optional.empty();
		}

		return Arrays.stream(Country.values())
				.filter(country -> country.name().equalsIgnoreCase(value))
				.findFirst();
	}
}
