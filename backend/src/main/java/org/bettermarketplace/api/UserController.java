package org.bettermarketplace.api;

import static org.bettermarketplace.api.response.ResponseStatusMessage.*;
import static org.bettermarketplace.api.response.ResponseStatusMessage.DELETED;

import org.bettermarketplace.api.dto.user.UserDto;
import org.bettermarketplace.api.response.ApiResponse;
import org.bettermarketplace.api.response.ResponseStatusMessage;
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
@RequestMapping(value = "/v1/users", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	private static final UserMapper MAPPER = UserMapper.INSTANCE;

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@DeleteMapping(value = "/user/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		return ResponseEntity.status(DELETED.statusCode()).build();
	}

	@GetMapping(value = "/user/{id}")
	public ResponseEntity<ApiResponse<UserDto>> getUser(@PathVariable("id") Long id) {
		var userDbo = userService.getUser(id);
		if (userDbo.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		var user = MAPPER.from(userDbo.get());

		return ResponseEntity.status(SUCCESS.statusCode()).body(
				ApiResponse.<UserDto>builder()
						.body(MAPPER.from(user))
						.build()
		);
	}
}
