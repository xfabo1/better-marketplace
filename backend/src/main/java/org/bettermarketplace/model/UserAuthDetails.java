package org.bettermarketplace.model;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserAuthDetails {

	private final String username;
	private final String email;
	private final Long userId;
	private final String[] roles;
	private final Instant tokenExpiration;
}
