package org.bettermarketplace.model;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = { "username", "email" })
public class User {

	private Long id;
	private String username;
	private String email;
	private Country country;
	private boolean displayItemsFromOtherCountry;
	private Instant createdAt;
	private Instant updatedAt;
}
