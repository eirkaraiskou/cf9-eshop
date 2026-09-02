package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.Product;
import com.cf.karaiskou.eshop.security.CustomUserDetails;
import com.cf.karaiskou.eshop.service.WishlistService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * REST Controller for managing wishlist operations.
 *
 *
 * Provides endpoints for:
 * <ul>
 *     <li>Adding a product to wishlist</li>
 *     <li>Removing a product from wishlist</li>
 *     <li>Retrieving the authenticated user's wishlist</li>
 * </ul>
 *
 */
@RestController
@RequestMapping("/api/wishlist")
@Tag(name = "Wishlist", description = "Endpoints for managing the user's wishlist")
public class WishlistController {

    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/{productId}")
    @Operation(summary = "Add product to wishlist", description = "Adds a product to the authenticated user's wishlist")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product successfully added to wishlist"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access")
    })
    public ResponseEntity<Void> addToWishlist(
            @Parameter(description = "The authenticated user") 
            @AuthenticationPrincipal CustomUserDetails user,
            @Parameter(description = "ID of the product to add", example = "1") 
            @PathVariable Long productId) {

        wishlistService.addToWishlist(user.getId(), productId);
        logger.info("api/wishlist/productId :: {} - Add product with id: {} to wishlist", user.getUsername(), productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Remove product from wishlist", description = "Removes a product from the authenticated user's wishlist")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product successfully removed from wishlist"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access")
    })
    public ResponseEntity<Void> removeFromWishlist(
            @Parameter(description = "The authenticated user") 
            @AuthenticationPrincipal CustomUserDetails user,
            @Parameter(description = "ID of the product to remove", example = "1") 
            @PathVariable Long productId) {

        wishlistService.removeFromWishlist(user.getId(), productId);
        logger.info("api/wishlist/productId :: Remove product with id: {} from wishlist", productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Get user's wishlist", description = "Retrieve all products in the authenticated user's wishlist")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved wishlist"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access")
    })
    public ResponseEntity<List<Product>> getWishlist(
            @Parameter(description = "The authenticated user") 
            @AuthenticationPrincipal CustomUserDetails user) {

        List<Product> wishlist = wishlistService.getWishlist(user.getId());
        logger.info("api/wishlist :: Get wishlist");
        return ResponseEntity.ok(wishlist);
    }
}