package org.bettermarketplace.security;

import static org.bettermarketplace.security.CookieUtil.AUTH_COOKIE_NAME;
import static org.bettermarketplace.security.CookieUtil.extractTokenFromCookie;

import java.util.Optional;

import org.bettermarketplace.api.dto.user.LoginRequest;
import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

	private static final UserMapper MAPPER = UserMapper.INSTANCE;

	private final TokenService tokenService;
	private final UserDao userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthController(TokenService tokenService, UserDao userRepository, PasswordEncoder passwordEncoder) {
		this.tokenService = tokenService;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
		Optional<UserDbo> userDbo = userRepository.getUserByEmail(request.email());

		if (userDbo.isEmpty()) {
			return ResponseEntity.status(401).body("Invalid email or password");
		}

		var user = MAPPER.from(userDbo.get());

		if (!passwordEncoder.matches(request.password(), user.getPassword())) {
			return ResponseEntity.status(401).body("Invalid email or password");
		}

		String token = tokenService.generateToken(user.getUsername(), user.getEmail(), "SCOPE_read", "SCOPE_write");

		Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, token);
		authCookie.setHttpOnly(true);
		authCookie.setSecure(true); // Only transmitted over HTTPS
		authCookie.setPath("/");
		authCookie.setAttribute("SameSite", "Strict"); // Protection against CSRF
		// Expiration in 7 days
		authCookie.setMaxAge(7 * 24 * 60 * 60);
		response.addCookie(authCookie);

		TokenResponse tokenResponse = TokenResponse.builder()
				.token(token)
				.tokenType("Bearer")
				.build();

		return ResponseEntity.ok(tokenResponse);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		String token = extractTokenFromCookie(request);

		if (StringUtils.hasText(token)) {
			// Revoke token on server side
			tokenService.revokeToken(token);
		}

		// Clear the cookie
		Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, null);
		authCookie.setHttpOnly(true);
		authCookie.setSecure(true);
		authCookie.setPath("/");
		authCookie.setMaxAge(0); // Set age to 0 to delete the cookie
		response.addCookie(authCookie);

		return ResponseEntity.ok("Logged out successfully");
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterUserDto request) {

		if (userRepository.getUserByEmail(request.email()).isPresent()) {
			return ResponseEntity.status(409).body("email_used");
		}

		if (userRepository.getUserByUsername(request.username()).isPresent()) {
			return ResponseEntity.status(409).body("username_used");
		}

		var user = MAPPER.from(request);
		user.setPassword(passwordEncoder.encode(request.password()));
		user.setCountry(request.country());
		user.setDisplayItemsFromOtherCountry(request.displayItemsFromOtherCountry());

		userRepository.insertUser(user);

		return ResponseEntity.ok("registered");
	}
}