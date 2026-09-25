package org.bettermarketplace.api.dto.user;

import lombok.Builder;

@Builder
public record UserDto(
		Long id,
		String username,
		String phoneNumber,
		String email) {
}

