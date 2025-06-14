package org.bettermarketplace.model;

import java.util.Arrays;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Currency {
	CZK, EUR;

	@JsonCreator
	public static Optional<Currency> fromString(String value) {
		if (value == null) {
			return Optional.empty();
		}

		return Arrays.stream(Currency.values())
				.filter(currency -> currency.name().equalsIgnoreCase(value))
				.findFirst();
	}
}
