package org.bettermarketplace.api;

import java.util.List;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.api.dto.UserDto;
import org.bettermarketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

	@GetMapping("/user/{id}")
	public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id) {
		var user = userService.getUser(id);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(UserDto.from(user));
	}

	@PostMapping("/user")
	public ResponseEntity<UserDto> createUser(@RequestBody CreateUserDto createUserDto) {
		var user = userService.insertUser(createUserDto);
		return ResponseEntity.status(201).body(UserDto.from(user));
	}

	@GetMapping
	public ResponseEntity<List<UserDto>> getUser() {
		return ResponseEntity.ok(userService.getUsers().map(UserDto::from).toList());
	}
}
