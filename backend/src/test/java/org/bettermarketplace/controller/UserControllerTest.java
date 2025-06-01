package org.bettermarketplace.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.bettermarketplace.api.UserController;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.config.ObjectMapperConfiguration;
import org.bettermarketplace.config.TestSecurityConfig;
import org.bettermarketplace.mapper.UserMapper;
import org.bettermarketplace.model.User;
import org.bettermarketplace.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserController.class)
@Import({ObjectMapperConfiguration.class, TestSecurityConfig.class})
public class UserControllerTest {

	private static final UserMapper MAPPER = UserMapper.INSTANCE;
	private static final String USER_CONTROLLER_PATH = "/v1/users";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockitoBean
	private UserService userService;

	@Test
	void getUser_validRequest_userReturned() throws Exception {
		var user = User.builder()
				.username("test")
				.email("random@gmail.com")
				.build();
		when(userService.getUser(anyLong())).thenReturn(user);

		var result = mockMvc.perform(get(USER_CONTROLLER_PATH + "/user/1"))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse()
				.getContentAsString();
		var userDto = objectMapper.readValue(result, UserDto.class);

		assertThat(userDto)
				.returns("test", UserDto::username)
				.returns("random@gmail.com", UserDto::email);
	}
}
