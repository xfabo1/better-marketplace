package org.bettermarketplace.api;

import org.bettermarketplace.api.dto.user.UserDto;
import org.bettermarketplace.api.response.ApiResponse;
import org.bettermarketplace.mapper.UserMapper;
import org.bettermarketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/v1/users")
public class UserController {

	private static final UserMapper MAPPER = UserMapper.INSTANCE;

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@DeleteMapping(value = "/user/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ApiResponse<Void> deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		return ApiResponse.<Void>builder()
				.statusCode(201)
				.build();
	}

	@GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ApiResponse<UserDto> getUser(@PathVariable("id") Long id) {
		var userDbo = userService.getUser(id);
		if (userDbo.isEmpty()) {
			return ApiResponse.<UserDto>builder()
					.statusCode(404)
					.body(null)
					.build();
		}

		var user = MAPPER.from(userDbo.get());

		return ApiResponse.<UserDto>builder()
				.statusCode(200)
				.body(MAPPER.from(user))
				.build();
	}
}
