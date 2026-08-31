package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.dto.CartResponse;
import com.cf.karaiskou.eshop.entity.Cart;
import com.cf.karaiskou.eshop.mapper.CartMapper;
import com.cf.karaiskou.eshop.security.CustomUserDetails;
import com.cf.karaiskou.eshop.service.CartService;

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

/**
 * REST Controller for managing cart operations.
 *
 * <p>
 * Provides endpoints for:
 * <ul>
 *     <li>Retrieving the authenticated user's cart</li>
 *     <li>Adding a product to cart</li>
 *     <li>Removing a product from cart</li>
 *     <li>Updating product quantity</li>
 *     <li>Clearing the cart</li>
 * </ul>
 * </p>
 */
@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Endpoints for managing shopping cart operations")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;
    private final CartMapper cartMapper;

    public CartController(CartService cartService, CartMapper cartMapper) {
        this.cartService = cartService;
        this.cartMapper = cartMapper;
    }

    @GetMapping
    @Operation(summary = "Get authenticated user's cart", description = "Retrieves the current shopping cart for the authenticated user")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cart retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<CartResponse> getCart(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal CustomUserDetails user) {

        Cart cart = cartService.getOrCreateCart(user.getUsername());
        CartResponse response = cartMapper.toCartResponse(cart);

        logger.info("api/cart :: Get cart for user {}", user.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}")
    @Operation(summary = "Add product to cart", description = "Adds a specified quantity of a product to the authenticated user's cart")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product added successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Void> addToCart(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal CustomUserDetails user,
            @Parameter(description = "Product ID to add") @PathVariable Long productId,
            @Parameter(description = "Quantity to add (default 1)") @RequestParam(defaultValue = "1") int quantity) {

        cartService.addToCart(user.getUsername(), productId, quantity);
        logger.info("api/cart :: User {} added product {} (qty {})", user.getUsername(), productId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Remove product from cart", description = "Removes a product from the authenticated user's cart")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product removed successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Void> removeFromCart(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal CustomUserDetails user,
            @Parameter(description = "Product ID to remove") @PathVariable Long productId) {

        cartService.removeFromCart(user.getUsername(), productId);
        logger.info("api/cart :: User {} removed product {}", user.getUsername(), productId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{productId}")
    @Operation(summary = "Update product quantity in cart", description = "Updates the quantity of a specific product in the authenticated user's cart")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Quantity updated successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Void> updateQuantity(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal CustomUserDetails user,
            @Parameter(description = "Product ID to update") @PathVariable Long productId,
            @Parameter(description = "New quantity") @RequestParam int quantity) {

        cartService.updateQuantity(user.getUsername(), productId, quantity);
        logger.info("api/cart :: User {} updated product {} to qty {}", user.getUsername(), productId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    @Operation(summary = "Clear cart", description = "Removes all items from the authenticated user's cart")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cart cleared successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Void> clearCart(
            @Parameter(description = "Authenticated user details from JWT") 
            @AuthenticationPrincipal CustomUserDetails user) {

        cartService.clearCart(user.getUsername());
        logger.info("api/cart :: User {} cleared cart", user.getUsername());
        return ResponseEntity.ok().build();
    }
}