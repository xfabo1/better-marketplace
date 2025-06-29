package org.bettermarketplace.api.dto.user;

import org.bettermarketplace.model.Country;

public record UserDetailsUpdateDto(

		String password,
		boolean displayItemsFromOtherCountry,
		Country country) {
}
