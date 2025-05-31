package org.bettermarketplace.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserAuthDetails {

	private final String username;
	private final String email;
	private final String[] roles;
}
