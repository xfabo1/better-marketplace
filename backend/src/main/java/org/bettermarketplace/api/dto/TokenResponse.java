package org.bettermarketplace.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenResponse {
    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
}
