package org.bettermarketplace.model;

import java.time.Instant;

import org.bettermarketplace.api.dto.RegisterUserDto;
import org.bettermarketplace.db.entity.UserDbo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class User {

	private Long id;
	private String username;
	private String email;
	private String password;
	private Country country;
	private Boolean displayItemsFromOtherCountry;
	private Instant deletedAt;
	private Instant createdAt;
	private Instant updatedAt;

	public static User from(RegisterUserDto registerUserDto) {
		return User.builder()
				.email(registerUserDto.email())
				.username(registerUserDto.username())
				.country(registerUserDto.country())
				.displayItemsFromOtherCountry(registerUserDto.allowDifferentCountryItems())
				.build();
	}

	public static User from(UserDbo userDbo) {
		return User.builder()
				.id(userDbo.id())
				.username(userDbo.username())
				.email(userDbo.email())
				.password(userDbo.password())
				.country(userDbo.country())
				.displayItemsFromOtherCountry(userDbo.displayItemsFromOtherCountry())
				.deletedAt(userDbo.deletedAt())
				.createdAt(userDbo.createdAt())
				.updatedAt(userDbo.updatedAt())
				.build();
	}
}
