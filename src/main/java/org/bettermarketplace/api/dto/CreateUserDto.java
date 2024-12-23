package org.bettermarketplace.api.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record CreateUserDto(@NotEmpty String username,
							@NotEmpty String email) {
}
