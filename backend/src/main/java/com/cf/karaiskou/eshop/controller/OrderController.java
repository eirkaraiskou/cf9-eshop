package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.dto.OrderRequest;
import com.cf.karaiskou.eshop.entity.Order;
import com.cf.karaiskou.eshop.entity.OrderItem;
import com.cf.karaiskou.eshop.service.OrderService;
import com.cf.karaiskou.eshop.security.CustomUserDetails;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller responsible for handling order-related endpoints.
 * 
 * Provides functionality for creating orders, retrieving user orders,
 * and managing order operations.
 * 
 */
@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders", description = "Endpoints for managing orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    @Operation(summary = "Checkout and create order", description = "Creates a new order for the authenticated user or guest")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order created successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access")
    })
    public Order checkout(
            @Parameter(description = "Order request payload containing cart items, total, shipping, and payment info") 
            @RequestBody OrderRequest request,
            @Parameter(description = "Authenticated user; null if guest") 
            @AuthenticationPrincipal CustomUserDetails user) {

        List<OrderItem> items = request.getItems().stream().map(dto -> {
            OrderItem item = new OrderItem();
            item.setProductId(dto.getProductId());
            item.setProductName(dto.getProductName());
            item.setPrice(dto.getPrice());
            item.setQuantity(dto.getQuantity());
            item.setSubtotal(dto.getSubtotal());
            return item;
        }).collect(Collectors.toList());

        Long userId = (user != null) ? user.getId() : null;

        return orderService.createOrder(
                userId,
                items,
                request.getTotal(),
                request.getShippingAddress(),
                request.getShippingMethod(),
                request.getPaymentMethod()
        );
    }

    @GetMapping("/user")
    @Operation(summary = "Get authenticated user's orders", description = "Retrieves orders for the currently authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access")
    })
    public List<Order> getUserOrders(
            @Parameter(description = "Authenticated user") 
            @AuthenticationPrincipal CustomUserDetails user) {

        return orderService.getUserOrders(user.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    @Operation(summary = "Get all orders (admin only)", description = "Retrieve all orders in the system (admin access required)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
        @ApiResponse(responseCode = "403", description = "Forbidden for non-admin users")
    })
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get orders by user ID (admin only)", description = "Retrieve all orders for a specific user by user ID (admin access required)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
        @ApiResponse(responseCode = "403", description = "Forbidden for non-admin users")
    })
    public List<Order> getUserOrders(
            @Parameter(description = "ID of the user to retrieve orders for", example = "1") 
            @PathVariable Long userId) {

        return orderService.getUserOrders(userId);
    }
}