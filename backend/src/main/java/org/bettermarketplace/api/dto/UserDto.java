package org.bettermarketplace.api.dto;

import lombok.Builder;

@Builder
public record UserDto(String username,
					  String email) {
}

