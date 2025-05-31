package org.bettermarketplace.api.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record AuthRequestDto(@NotEmpty String email, @NotEmpty String password) {
}
