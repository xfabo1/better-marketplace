package org.bettermarketplace.api.dto;

import org.bettermarketplace.model.User;

import lombok.Builder;

@Builder
public record UserDto(String username,
					  String email) {

	public static UserDto from(User user) {
		return UserDto.builder()
				.username(user.getUsername())
				.email(user.getEmail())
				.build();
	}
}

