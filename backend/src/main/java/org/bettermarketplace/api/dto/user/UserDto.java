package org.bettermarketplace.api.dto.user;

import org.bettermarketplace.model.Country;

import lombok.Builder;

@Builder
public record UserDto(
		Long id,
		String username,
		String phoneNumber,
		String email,
		boolean displayItemsFromOtherCountry,
		Country country) {
}

