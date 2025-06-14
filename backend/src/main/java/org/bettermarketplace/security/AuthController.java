package org.bettermarketplace.security;

import static org.bettermarketplace.security.CookieUtil.AUTH_COOKIE_NAME;
import static org.bettermarketplace.security.CookieUtil.extractTokenFromCookie;

import java.util.Optional;

import org.bettermarketplace.api.dto.user.LoginRequest;
import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.api.dto.user.UserDto;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.UserMapper;
import org.bettermarketplace.service.UserService;
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
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;

	public AuthController(TokenService tokenService, UserService userService, PasswordEncoder passwordEncoder) {
		this.tokenService = tokenService;
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody LoginRequest request, HttpServletResponse response) {
		Optional<UserDbo> userDbo = userService.getUserByEmail(request.email());

		if (userDbo.isEmpty()) {
			return ResponseEntity.status(401).build();
		}

		var user = MAPPER.from(userDbo.get());

		if (!passwordEncoder.matches(request.password(), user.getPassword())) {
			return ResponseEntity.status(401).build();
		}

		String token = tokenService.generateToken(user.getUsername(), user.getEmail(), user.getId(), "SCOPE_read", "SCOPE_write");

		Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, token);
		authCookie.setHttpOnly(true);
		authCookie.setSecure(false); // Set to true in production with HTTPS
		authCookie.setPath("/");
		authCookie.setAttribute("SameSite", "Lax"); // Changed from Strict to Lax for better cross-origin experience
		// Expiration in 30 days
		authCookie.setMaxAge(30 * 24 * 60 * 60);
		response.addCookie(authCookie);

		return ResponseEntity.ok(MAPPER.from(user));
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
		String token = extractTokenFromCookie(request);

		if (StringUtils.hasText(token)) {
			// Revoke token on server side
			tokenService.revokeToken(token);
		}

		// Clear the cookie
		Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, null);
		authCookie.setHttpOnly(true);
		authCookie.setSecure(false); // Set to true in production with HTTPS
		authCookie.setPath("/");
		authCookie.setMaxAge(0); // Set age to 0 to delete the cookie
		response.addCookie(authCookie);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto) {
		try {
			if (userService.getUserByEmail(registerUserDto.email()).isPresent()) {
				return ResponseEntity.status(409).body("email_used");
			}

			if (userService.getUserByUsername(registerUserDto.username()).isPresent()) {
				return ResponseEntity.status(409).body("username_used");
			}

			var password = passwordEncoder.encode(registerUserDto.password());

			userService.insertUser(registerUserDto, password);

			return ResponseEntity.ok("registered");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("registration_error: " + e.getMessage());
		}
	}
}