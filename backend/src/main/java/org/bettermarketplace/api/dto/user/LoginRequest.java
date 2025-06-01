package org.bettermarketplace.api.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record LoginRequest(
    @NotEmpty String email,
    @NotEmpty String password
) {
}
