package org.bettermarketplace.api;

import java.util.List;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
public class UserController {

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
		var user = userService.getUser(id);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(UserDto.from(user));
	}

	@PostMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDto> createUser(@RequestBody CreateUserDto createUserDto) {
		var user = userService.insertUser(createUserDto);
		return ResponseEntity.status(201).body(UserDto.from(user));
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserDto>> getUsers() {
		return ResponseEntity.ok(userService.getUsers().map(UserDto::from).toList());
	}
}
