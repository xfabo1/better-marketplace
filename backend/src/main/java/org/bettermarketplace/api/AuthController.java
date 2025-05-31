package org.bettermarketplace.api;

import org.bettermarketplace.api.dto.LoginRequest;
import org.bettermarketplace.api.dto.RegisterUserDto;
import org.bettermarketplace.api.dto.TokenResponse;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.User;
import org.bettermarketplace.service.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

	private final TokenService tokenService;

	private final UserDao userRepository;

	private final PasswordEncoder passwordEncoder;

	public AuthController(TokenService tokenService, UserDao userRepository, PasswordEncoder passwordEncoder) {
		this.tokenService = tokenService;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		// Find user by email
		Optional<UserDbo> userDbo = userRepository.getUserByEmail(request.getEmail());

		if (userDbo.isEmpty()) {
			return ResponseEntity.status(401).body("Invalid email or password");
		}

		User user = User.from(userDbo.get());

		// Verify password
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			return ResponseEntity.status(401).body("Invalid email or password");
		}

		// Generate token
		String token = tokenService.generateToken(user.getUsername(), user.getEmail(), "SCOPE_read", "SCOPE_write");

		// Return token response
		TokenResponse tokenResponse = TokenResponse.builder()
				.token(token)
				.tokenType("Bearer")
				.build();

		return ResponseEntity.ok(tokenResponse);
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterUserDto request) {

		if (userRepository.getUserByEmail(request.email()).isPresent()) {
			return ResponseEntity.status(409).body("email_used");
		}

		if (userRepository.getUserByUsername(request.username()).isPresent()) {
			return ResponseEntity.status(409).body("username_used");
		}

		var user = User.from(request);
		user.setPassword(passwordEncoder.encode(request.password()));
		user.setCountry(request.country());
		user.setDisplayItemsFromOtherCountry(request.allowDifferentCountryItems());

		userRepository.insertUser(user);

		return ResponseEntity.ok("registered");
	}
}

