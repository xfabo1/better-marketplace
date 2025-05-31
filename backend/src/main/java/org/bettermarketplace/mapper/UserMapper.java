package org.bettermarketplace.mapper;

import org.bettermarketplace.api.dto.RegisterUserDto;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	User from(RegisterUserDto registerUserDto);
	User from(UserDbo userDbo);
	UserDto from(User user);
}
