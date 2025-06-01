package org.bettermarketplace.security;

import lombok.Builder;

@Builder
public record TokenResponseDto(String token) {
}
