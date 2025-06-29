package org.bettermarketplace.api.dto.user;

import java.time.Instant;

import org.bettermarketplace.model.Country;

public record UserDto(
		Long id,
		String username,
		String email,
		boolean displayItemsFromOtherCountry,
		Country country,
		Instant createdAt,
		Instant updatedAt) {
}

