package org.bettermarketplace.api.dto;

import org.bettermarketplace.model.User;

import lombok.Builder;

@Builder
public record UserDto(String name,
					  String surname,
					  String email) {

	public static UserDto from(User user) {
		return UserDto.builder()
				.name(user.getName())
				.surname(user.getSurname())
				.email(user.getEmail())
				.build();
	}
}

