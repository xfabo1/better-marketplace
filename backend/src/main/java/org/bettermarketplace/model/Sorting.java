package org.bettermarketplace.model;

import java.util.Arrays;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Sorting {
	NEWEST, OLDEST, PRICE_ASC, PRICE_DESC;

	@JsonCreator
	public static Optional<Sorting> fromString(String value) {
		if (value == null) {
			return Optional.empty();
		}

		return Arrays.stream(Sorting.values())
				.filter(sorting -> sorting.name().equalsIgnoreCase(value))
				.findFirst();
	}
}