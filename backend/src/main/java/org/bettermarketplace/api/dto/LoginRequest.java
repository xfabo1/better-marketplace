package org.bettermarketplace.api.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {
    @NotEmpty
    private String email;

    @NotEmpty
    private String password;
}
