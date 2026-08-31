package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.repository.OrderRepository;
import com.cf.karaiskou.eshop.repository.UserRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * Controller for retrieving administrative statistics related to users and orders.
 * <p>
 * Provides a single endpoint to fetch overall counts, revenue, and breakdowns for
 * orders by day, shipping method, payment method, and status.
 * </p>
 */
@RestController
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Stats", description = "Endpoints for administrative statistics")
public class AdminStatsController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminStatsController(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    /**
     * Retrieve aggregated statistics for users and orders.
     * <p>
     * Includes:
     * <ul>
     *     <li>Number of registered users</li>
     *     <li>Total number of orders</li>
     *     <li>Total order amount</li>
     *     <li>Orders per day for the last 7 days</li>
     *     <li>Counts per shipping method</li>
     *     <li>Counts per payment method</li>
     *     <li>Counts per order status</li>
     * </ul>
     *
     * @return a map containing all the above statistics
     */
    @GetMapping("/api/admin/stats")
    @Operation(summary = "Get aggregated statistics for users and orders (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Statistics returned successfully"),
        @ApiResponse(responseCode = "403", description = "Forbidden if not admin")
    })
    public Map<String, Object> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();

        // Users
        stats.put("totalUsers", userRepository.count());

        // Orders
        stats.put("totalOrders", orderRepository.count());
        stats.put("totalOrderAmount", orderRepository.getTotalAmount());

        // Orders per day (last 7 days)
        LocalDateTime DaysAgo = LocalDate.now()
            .minusDays(14)
            .atStartOfDay();

        List<Object[]> ordersPerDay = orderRepository.countOrdersPerDaySince(DaysAgo);

        Map<String, Long> ordersPerDayMap = new LinkedHashMap<>();
        for (Object[] row : ordersPerDay) {
            String date = row[0].toString();
            Long count = ((Number) row[1]).longValue();
            ordersPerDayMap.put(date, count);
        }
        stats.put("ordersPerDayLast7Days", ordersPerDayMap);

        // Shipping method counts
        List<Object[]> shippingCounts = orderRepository.countByShippingMethod();
        Map<String, Long> shippingMap = new HashMap<>();
        for (Object[] row : shippingCounts) {
            shippingMap.put((String) row[0], (Long) row[1]);
        }
        stats.put("shippingMethodCounts", shippingMap);

        // Payment method counts
        List<Object[]> paymentCounts = orderRepository.countByPaymentMethod();
        Map<String, Long> paymentMap = new HashMap<>();
        for (Object[] row : paymentCounts) {
            paymentMap.put((String) row[0], (Long) row[1]);
        }
        stats.put("paymentMethodCounts", paymentMap);

        // Status counts
        List<Object[]> statusCounts = orderRepository.countByStatus();
        Map<String, Long> statusMap = new HashMap<>();
        for (Object[] row : statusCounts) {
            statusMap.put((String) row[0], (Long) row[1]);
        }
        stats.put("statusCounts", statusMap);

        return stats;
    }
}