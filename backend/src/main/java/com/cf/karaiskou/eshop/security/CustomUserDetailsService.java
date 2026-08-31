package com.cf.karaiskou.eshop.security;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom implementation of {@link CustomUserDetailsService} for Spring Security.
 * <p>
 * This service loads user data from the database and maps it to Spring Security's {@link UserDetails}.
 * It is used during authentication to validate username and password and assign roles.
 * </p>
 * <p>
 * The roles in {@link User} are mapped to Spring Security authorities automatically.
 * </p>
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Constructor injection of {@link UserRepository}.
     *
     * @param userRepository the repository to access users in the database
     */
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     /**
     * Loads a user by email for authentication.
     *
     * @param email the email identifying the user
     * @return a {@link UserDetails} object for Spring Security
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (!user.getStatus()) {
            throw new RuntimeException("USER_DISABLED");
        }

        return new CustomUserDetails(user);
    }
}