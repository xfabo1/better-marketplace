package org.bettermarketplace.api.dto.user;

import org.bettermarketplace.model.Country;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RegisterUserDto(@NotEmpty String username,
							  @NotEmpty String email,
							  @NotEmpty String password,
							  boolean displayItemsFromOtherCountry,
							  @NotNull Country country) {
}
