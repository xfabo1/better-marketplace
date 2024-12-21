package org.bettermarketplace.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.stream.Stream;

import org.bettermarketplace.api.UserController;
import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.config.ObjectMapperConfiguration;
import org.bettermarketplace.model.User;
import org.bettermarketplace.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserController.class)
@Import(ObjectMapperConfiguration.class)
public class UserControllerTest {

	private static final String USER_CONTROLLER_PATH = "/v1/users";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockitoBean
	private UserService userService;

	@Test
	void insertUser_validBody_userCreated() throws Exception {
		var createUserDto = CreateUserDto.builder()
				.email("random@gmail.com")
				.name("test")
				.surname("test")
				.build();
		var user = User.from(createUserDto);

		when(userService.insertUser(createUserDto)).thenReturn(user);

		var result = mockMvc.perform(post(USER_CONTROLLER_PATH + "/user")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(createUserDto)))
				.andExpect(status().is(201))
				.andReturn()
				.getResponse().getContentAsString();

		var userDto = objectMapper.readValue(result, UserDto.class);

		assertThat(userDto)
				.returns("test", UserDto::name)
				.returns("test", UserDto::surname)
				.returns("random@gmail.com", UserDto::email);
	}

	@Test
	void getUsers_validRequest_usersReturned() {
		when(userService.getUsers()).thenReturn(Stream.of());
	}
}
