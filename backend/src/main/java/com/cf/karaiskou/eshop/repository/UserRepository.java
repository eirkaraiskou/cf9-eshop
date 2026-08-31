package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository interface for {@link User} entity.
 * <p>
 * Provides basic CRUD operations inherited from {@link JpaRepository} and
 * custom queries to find users by username or email.
 * </p>
 * <p>
 * Methods defined here are automatically implemented by Spring Data JPA.
 * </p>
 * 
 * <ul>
 *     <li>{@link #findByUsername(String)} - Find a user by their unique username</li>
 *     <li>{@link #findByEmail(String)} - Find a user by their unique email</li>
 * </ul>
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user to search for
     * @return an {@link Optional} containing the found {@link User}, or empty if not found
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user to search for
     * @return an {@link Optional} containing the found {@link User}, or empty if not found
     */
    Optional<User> findByEmail(String email);
}