package org.bettermarketplace.api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RegisterUserDto(@NotBlank @Size(min = 3, max = 50) String username,
							  @NotBlank @Email @Size(max = 255) String email,
							  // BCrypt ignores everything after 72 bytes
							  @NotBlank @Size(min = 8, max = 72) String password) {
}
