package org.bettermarketplace.model;

import java.time.Instant;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.db.entity.UserDbo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class User {

	private String username;
	private Instant createdAt;
	private Instant updatedAt;
	private String email;

	public static User from(CreateUserDto createUserDto) {
		return User.builder()
				.email(createUserDto.email())
				.username(createUserDto.username())
				.build();
	}

	public static User from(UserDbo userDbo) {
		return User.builder()
				.username(userDbo.username())
				.email(userDbo.email())
				.build();
	}
}
