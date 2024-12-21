package org.bettermarketplace.model;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.db.entity.UserDbo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class User {

	private String name;
	private String surname;
	private String email;

	public static User from(CreateUserDto createUserDto) {
		return User.builder()
				.email(createUserDto.email())
				.name(createUserDto.name())
				.surname(createUserDto.surname())
				.build();
	}

	public static User from(UserDbo userDbo) {

		return User.builder()
				.name(userDbo.name())
				.surname(userDbo.surname())
				.email(userDbo.email())
				.build();
	}
}
