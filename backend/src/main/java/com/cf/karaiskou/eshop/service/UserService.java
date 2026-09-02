package com.cf.karaiskou.eshop.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.UserRepository;

/**
 * Service class for managing {@link User} entities.
 * <p>
 * Provides methods for retrieving users, checking existence, and creating new users.
 * All repository calls are wrapped with logging for easier debugging.
 * </p>
 */
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    /**
     * Constructs a new {@link UserService}.
     *
     * @param userRepository the user repository to use
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all users from the system.
     *
     * <p>
     * Typically used by administrators to view and manage user accounts.
     * </p>
     *
     * @return a list of all users
     */
    public List<User> getAllUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll();
    }

    /**
     * Finds a user by username.
     *
     * @param username the username to search for
     * @return an {@link Optional} containing the user if found
     */
    public Optional<User> findByUsername(String username) {
        logger.info("Looking for user with username: {}", username);
        return userRepository.findByUsername(username);
    }

    /**
     * Finds a user by email.
     *
     * @param email the email to search for
     * @return an {@link Optional} containing the user if found
     */
    public Optional<User> findByEmail(String email) {
        logger.info("Looking for user with email: {}", email);
        return userRepository.findByEmail(email);
    }

    /**
     * Creates a new user.
     *
     * @param user the user to create
     * @return the saved {@link User} entity
     */
    public User createUser(User user) {
        logger.info("Creating new user with username: {} and email: {}", user.getUsername(), user.getEmail());
        return userRepository.save(user);
    }

    /**
     * Checks if a user exists by username.
     *
     * @param username the username to check
     * @return true if the user exists, false otherwise
     */
    public boolean existsByUsername(String username) {
        boolean exists = userRepository.findByUsername(username).isPresent();
        logger.info("User with username '{}' exists? {}", username, exists);
        return exists;
    }

    /**
     * Checks if a user exists by email.
     *
     * @param email the email to check
     * @return true if the user exists, false otherwise
     */
    public boolean existsByEmail(String email) {
        boolean exists = userRepository.findByEmail(email).isPresent();
        logger.info("User with email '{}' exists? {}", email, exists);
        return exists;
    }

    /**
     * Updates the active status of a user.
     *
     * @param userId the ID of the user
     * @param status the new active status
     */
    public User updateUserStatus(Long userId, boolean status) {
        logger.info("Updating user {} active status to {}", userId, status);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(status);

        return userRepository.save(user);
    }

    /**
     * Toggles the status of a user.
     *
     * <p>
     * If the user is active, they will become inactive and vice versa.
     * </p>
     *
     * @param userId the ID of the user
     * @return the updated {@link User} entity
     */
    public User toggleUserStatus(Long userId) {
        logger.info("Toggling status for user {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Toggle status (true ↔ false)
        user.setStatus(!user.getStatus());

        return userRepository.save(user);
    }
}