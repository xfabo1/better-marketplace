package org.bettermarketplace.mapper;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	User from(CreateUserDto createUserDto);
	User from(UserDbo userDbo);
	UserDto from(User user);
}
