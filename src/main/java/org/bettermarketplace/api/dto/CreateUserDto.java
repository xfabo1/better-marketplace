package org.bettermarketplace.api.dto;

import lombok.Builder;

@Builder
public record CreateUserDto(String name,
							String surname,
							String email) {
}
