package com.cf.karaiskou.eshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO representing the login request payload.
 */
@Schema(description = "Login request containing username and password")
public class LoginRequest {

    @NotBlank(message = "Username is required")
    @Schema(description = "Username of the user", example = "john_doe")
    private String username;

    @NotBlank(message = "Password is required")
    @Schema(description = "Password of the user", example = "john1234!")
    private String password;

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}