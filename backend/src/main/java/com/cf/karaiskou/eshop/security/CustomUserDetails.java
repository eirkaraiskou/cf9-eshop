package com.cf.karaiskou.eshop.security;

import com.cf.karaiskou.eshop.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Custom implementation of {@link UserDetails}.
 *
 * <p>
 * This class wraps the application's {@link User} entity and provides
 * user information to Spring Security during authentication and authorization.
 * </p>
 *
 * <p>
 * It allows access to additional user data (such as ID) which is not available
 * in the default Spring Security {@link org.springframework.security.core.userdetails.User}.
 * </p>
 */
public class CustomUserDetails implements UserDetails {

    /**
     * The underlying User entity.
     */
    private final User user;

    /**
     * Constructor that initializes the CustomUserDetails with a User entity.
     *
     * @param user the authenticated user entity
     */
    public CustomUserDetails(User user) {
        this.user = user;
    }

    /**
     * Gets the full User entity.
     *
     * @return the User entity
     */
    public User getUser() {
        return user;
    }

    /**
     * Gets the ID of the user.
     *
     * @return the user's ID
     */
    public Long getId() {
        return user.getId();
    }

    /**
     * Returns the authorities granted to the user.
     *
     * @return a collection of granted authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + user.getRole());
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * @return the user's password
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * Returns the username used to authenticate the user.
     * In this case, the email is used as username.
     *
     * @return the user's email
     */
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    /**
     * Indicates whether the user's account is enabled.
     *
     * @return true if enabled, false otherwise
     */
    @Override
    public boolean isEnabled() {
        return user.getStatus();
    }

    /**
     * Indicates whether the user's account has expired.
     *
     * @return always true (not implemented)
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is locked or unlocked.
     *
     * @return always true (not implemented)
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) has expired.
     *
     * @return always true (not implemented)
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}