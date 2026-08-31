package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.Order;
import com.cf.karaiskou.eshop.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

/**
 * Admin controller for managing orders.
 *
 * Provides endpoints for:
 * - Retrieving all orders
 * - Updating order status
 * - Retrieving a single order with its items
 */
@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Orders", description = "Endpoints for managing orders (admin only)")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Retrieve all orders.
     *
     * @return list of orders
     */
    @GetMapping
    @Operation(summary = "Get all orders (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "List of orders retrieved successfully")
    })
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    /**
     * Retrieve a single order with items.
     *
     * @param orderId order ID
     * @return order with items
     */
    @GetMapping("/{orderId}")
    @Operation(summary = "Get a single order by ID with its items (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found")
    })
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    /**
     * Update the status of an order.
     *
     * @param orderId order ID
     * @param status new status
     * @return updated order
     */
    @PutMapping("/{orderId}/status")
    @Operation(summary = "Update the status of an order (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order status updated successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found")
    })
    public Order updateOrderStatus(@PathVariable Long orderId,
                                   @RequestParam String status) {
        return orderService.updateOrderStatus(orderId, status);
    }
}