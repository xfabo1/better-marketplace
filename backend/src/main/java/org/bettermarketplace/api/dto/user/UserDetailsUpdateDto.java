package org.bettermarketplace.api.dto.user;

import org.bettermarketplace.model.Country;

import lombok.Builder;

@Builder
public record UserDetailsUpdateDto(
		String password,
		boolean displayItemsFromOtherCountry,
		Country country) {
}
