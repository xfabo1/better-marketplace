package org.bettermarketplace.service;

import java.util.List;

import org.bettermarketplace.db.dao.UserDao;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserDao userRepository;

    public CustomUserDetailsService(UserDao userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.getUserByEmail(email)
                .map(userDbo -> new org.springframework.security.core.userdetails.User(
						userDbo.email(),
						userDbo.password(),
						List.of(
							new SimpleGrantedAuthority("SCOPE_read"),
							new SimpleGrantedAuthority("SCOPE_write")
						)
				))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
