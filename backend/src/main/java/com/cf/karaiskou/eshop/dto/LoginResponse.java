package com.cf.karaiskou.eshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO representing the login response payload.
 */
@Schema(description = "Response containing JWT token and username")
public class LoginResponse {

    @Schema(description = "JWT token for authenticated requests", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    @Schema(description = "Username of the authenticated user", example = "john_doe")
    private String username;

    // Constructors

    public LoginResponse() {
    }

    public LoginResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    // Getters and setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}