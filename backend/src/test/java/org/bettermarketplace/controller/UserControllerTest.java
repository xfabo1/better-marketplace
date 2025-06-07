package org.bettermarketplace.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.Optional;

import org.bettermarketplace.api.UserController;
import org.bettermarketplace.api.dto.user.UserDto;
import org.bettermarketplace.config.ObjectMapperConfiguration;
import org.bettermarketplace.config.TestSecurityConfig;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.Country;
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

	private static final String USER_CONTROLLER_PATH = "/v1/users";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockitoBean
	private UserService userService;

	@Test
	void getUser_validRequest_userReturned() throws Exception {
		var user = UserDbo.builder()
				.username("test")
				.email("random@gmail.com")
				.id(1L)
				.country(Country.CZ)
				.displayItemsFromOtherCountry(false)
				.createdAt(Instant.now())
				.build();
		when(userService.getUser(anyLong())).thenReturn(Optional.of(user));

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
