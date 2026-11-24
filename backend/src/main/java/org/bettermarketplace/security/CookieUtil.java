package org.bettermarketplace.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class CookieUtil {

	public static final String AUTH_COOKIE_NAME = "authCookie";

	public static final String REFRESHED_TOKEN_ATTRIBUTE = "refreshedAuthToken";

	public static String extractTokenFromCookie(HttpServletRequest request) {
		if (request.getAttribute(REFRESHED_TOKEN_ATTRIBUTE) instanceof String refreshedToken) {
			return refreshedToken;
		}

		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (AUTH_COOKIE_NAME.equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}
}
