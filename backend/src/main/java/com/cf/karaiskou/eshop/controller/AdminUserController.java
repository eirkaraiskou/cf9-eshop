package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.service.UserService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * Admin controller for managing users.
 *
 * Provides endpoints for:
 * <ul>
 *     <li>Retrieving all users</li>
 *     <li>Activating / deactivating users</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Users", description = "Endpoints for administrators to manage users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Retrieve all users.
     *
     * @return list of users
     */
    @GetMapping
    @Operation(summary = "Retrieve all users (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "List of all users returned"),
        @ApiResponse(responseCode = "403", description = "Forbidden if not admin")
    })
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Toggle user active status.
     *
     * @param userId user ID
     * @return updated user
     */
    @PutMapping("/{userId}/toggle-status")
    @Operation(summary = "Activate or deactivate a user (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "User status toggled successfully"),
        @ApiResponse(responseCode = "403", description = "Forbidden if not admin"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public User toggleUserStatus(@PathVariable Long userId) {
        return userService.toggleUserStatus(userId);
    }
}