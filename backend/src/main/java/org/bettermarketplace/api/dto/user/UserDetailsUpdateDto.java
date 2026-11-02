package org.bettermarketplace.api.dto.user;

import lombok.Builder;

@Builder
public record UserDetailsUpdateDto(
		String password) {
}
