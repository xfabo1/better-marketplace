package org.bettermarketplace.security;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.bettermarketplace.model.UserAuthDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private final Map<String, UserAuthDetails> tokenToUserDetails = new ConcurrentHashMap<>();
	private final SecureRandom secureRandom = new SecureRandom();

	@Value("${app.security.token.expiration-hours:24}")
	private int tokenExpirationHours = 24;

	@Value("${app.security.token.refresh-before-minutes:30}")
	private int refreshBeforeMinutes = 30;

	public String generateToken(String username, String email, String... roles) {
		byte[] randomBytes = new byte[32];
		secureRandom.nextBytes(randomBytes);
		String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

		Instant expiration = Instant.now().plus(tokenExpirationHours, ChronoUnit.HOURS);

		UserAuthDetails details = new UserAuthDetails(username, email, roles, expiration);
		tokenToUserDetails.put(token, details);
		return token;
	}

	public String refreshToken(String oldToken) {
		UserAuthDetails oldDetails = tokenToUserDetails.get(oldToken);
		if (oldDetails == null) {
			return null;
		}

		tokenToUserDetails.remove(oldToken);

		return generateToken(oldDetails.getUsername(), oldDetails.getEmail(), oldDetails.getRoles());
	}

	public UserAuthDetails validateToken(String token) {
		var userAuthDetails = tokenToUserDetails.get(token);
		if (userAuthDetails == null) {
			return null;
		}
		if (userAuthDetails.getTokenExpiration() != null &&
			Instant.now().isAfter(userAuthDetails.getTokenExpiration())) {
			revokeToken(token);
			return null;
		}
		return userAuthDetails;
	}

	public boolean isTokenAboutToExpire(String token) {
		UserAuthDetails userAuthDetails = tokenToUserDetails.get(token);
		if (userAuthDetails != null && userAuthDetails.getTokenExpiration() != null) {
			return Instant.now().plus(refreshBeforeMinutes, ChronoUnit.MINUTES)
				.isAfter(userAuthDetails.getTokenExpiration());
		}
		return false;
	}

	public void revokeToken(String token) {
		tokenToUserDetails.remove(token);
	}
}
