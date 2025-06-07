package org.bettermarketplace.api.dto.user;

import org.bettermarketplace.model.Country;

import lombok.Builder;

@Builder
public record UserDto(
		String username,
	  	String email,
		boolean displayItemsFromOtherCountry,
		Country country) {
}

