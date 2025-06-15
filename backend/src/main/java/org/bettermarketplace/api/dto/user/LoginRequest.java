package org.bettermarketplace.api.dto.user;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(
    @NotEmpty String email,
    @NotEmpty String password
) {
}
