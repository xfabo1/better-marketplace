package org.bettermarketplace.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private static final String AUTH_COOKIE_NAME = "auth_token";

    public TokenAuthenticationFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        var token = CookieUtil.extractTokenFromCookie(request);

        if (StringUtils.hasText(token)) {
            var userDetails = tokenService.validateToken(token);

            if (userDetails != null) {
                if (tokenService.isTokenAboutToExpire(token)) {
                    var newToken = tokenService.refreshToken(token);

                    var authCookie = new Cookie(AUTH_COOKIE_NAME, newToken);
                    authCookie.setHttpOnly(true);
                    authCookie.setSecure(true);
                    authCookie.setPath("/");
                    authCookie.setAttribute("SameSite", "Strict");
                    response.addCookie(authCookie);

                    token = newToken;
                    userDetails = tokenService.validateToken(token);
                }

                List<SimpleGrantedAuthority> authorities = Collections.emptyList();
                if (userDetails.getRoles() != null) {
                    authorities = Arrays.stream(userDetails.getRoles())
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                }

                var authentication = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(),
                        null,
                        authorities
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
