package org.bettermarketplace.api.dto;

import lombok.Builder;

@Builder
public record CreateUserDto(String password,
							String username,
							String email) {
}
