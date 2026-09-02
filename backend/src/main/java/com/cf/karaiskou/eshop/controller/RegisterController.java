package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for user registration.
 * 
 * Provides an endpoint to create a new user account.
 * Passwords are hashed using {@link PasswordEncoder}, and newly created accounts are active by default.
 * 
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "User Registration", description = "Endpoints for creating new user accounts")
public class RegisterController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new user account.
     *
     * @param registrationRequest JSON payload containing "username", "password", "email", "firstName", "lastName"
     * @return JSON response with success message or error details
     */
    @PostMapping("/register")
    @Operation(
        summary = "Create a new user account",
        description = "Register a new user with a username, email, password, first name, and last name. " +
                      "Passwords are securely hashed. The newly created account is active by default."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User registered successfully"),
        @ApiResponse(responseCode = "400", description = "Username already exists or email already registered")
    })
    public ResponseEntity<Map<String, String>> register(
            @Parameter(
                description = "Registration request payload",
                example = "{\"username\":\"john_doe\",\"password\":\"password123\",\"email\":\"john@example.com\",\"firstName\":\"John\",\"lastName\":\"Doe\"}"
            )
            @RequestBody Map<String, String> registrationRequest) {

        String username = registrationRequest.get("username");
        String email = registrationRequest.get("email");

        Map<String, String> response = new HashMap<>();

        // Check if username already exists
        Optional<User> existingUserByUsername = userRepository.findByUsername(username);
        if (existingUserByUsername.isPresent()) {
            logger.warn("Attempted registration with existing username '{}'", username);
            response.put("error", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if email already exists
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            logger.warn("Attempted registration with existing email '{}'", email);
            response.put("error", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setFirstName(registrationRequest.get("firstName"));
        user.setLastName(registrationRequest.get("lastName"));
        user.setPassword(passwordEncoder.encode(registrationRequest.get("password"))); // hash password
        user.setRole("USER"); // default role
        user.setStatus(true);  // active by default
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        logger.info("api/auth/register :: New user '{}' registered successfully", username);

        response.put("message", "User registered successfully");
        response.put("username", username);
        return ResponseEntity.ok(response);
    }
}