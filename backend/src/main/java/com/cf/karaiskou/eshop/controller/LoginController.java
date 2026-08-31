package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.UserRepository;
import com.cf.karaiskou.eshop.utility.JwtUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for user authentication.
 * <p>
 * Provides endpoints for:
 * <ul>
 *     <li>User login and JWT token generation</li>
 *     <li>Password change for authenticated users</li>
 * </ul>
 * </p>
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user login and JWT token generation")
public class LoginController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(LoginController.class);

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;
    private final UserRepository userRepository;

    public LoginController(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtUtility jwtUtility,
            UserRepository userRepository) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtility = jwtUtility;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and return JWT token", description = "Authenticates a user and returns a JWT token along with basic user info")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    public ResponseEntity<Map<String, String>> login(
            @Parameter(description = "Login payload containing 'email' and 'password'") 
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtility.generateToken(userDetails);

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found after authentication"));

            logger.info("/api/auth/login :: User '{}' logged in successfully", email);

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("email", email);
            response.put("username", user.getUsername());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            logger.warn("/api/auth/login :: Failed login attempt for email '{}'", email);
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PutMapping("/changePassword")
    @Operation(summary = "Change authenticated user's password", description = "Allows authenticated users to change their password by validating the current password first")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password updated successfully"),
        @ApiResponse(responseCode = "400", description = "Current password is incorrect"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Map<String, String>> changePassword(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Payload containing 'currentPassword' and 'newPassword'") 
            @RequestBody Map<String, String> request) {

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            logger.warn("/api/auth/changePassword :: Invalid current password for user '{}'", user.getEmail());
            return ResponseEntity.status(400).body(Map.of("error", "Current password is incorrect"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        logger.info("/api/auth/changePassword :: Password updated for user '{}'", user.getEmail());
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}