package org.bettermarketplace.api;

import org.bettermarketplace.api.dto.user.UserDto;
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
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id) {
		var userDbo = userService.getUser(id);
		if (userDbo.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		var user = MAPPER.from(userDbo.get());

		return ResponseEntity.ok(MAPPER.from(user));
	}
}
