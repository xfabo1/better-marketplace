package org.bettermarketplace.service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.bettermarketplace.model.UserAuthDetails;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private final Map<String, UserAuthDetails> tokenToUserDetails = new ConcurrentHashMap<>();
	private final SecureRandom secureRandom = new SecureRandom();

	public String generateToken(String username, String email, String... roles) {
		byte[] randomBytes = new byte[32];
		secureRandom.nextBytes(randomBytes);
		String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

		tokenToUserDetails.put(token, new UserAuthDetails(username, email, roles));
		return token;
	}

	public UserAuthDetails validateToken(String token) {
		return tokenToUserDetails.get(token);
	}

	public void revokeToken(String token) {
		tokenToUserDetails.remove(token);
	}
}
