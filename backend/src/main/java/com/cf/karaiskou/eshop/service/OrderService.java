package com.cf.karaiskou.eshop.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import com.cf.karaiskou.eshop.entity.Order;
import com.cf.karaiskou.eshop.entity.OrderItem;
import com.cf.karaiskou.eshop.repository.OrderRepository;

/**
 * Service class responsible for handling business logic related to orders.
 * <p>
 * This service manages the creation of orders from cart data, retrieval of user orders,
 * and updating order statuses. It acts as an intermediary between controllers and repositories.
 * </p>
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    /**
     * Constructor for dependency injection.
     *
     * @param orderRepository the repository used for order persistence
     */
    public OrderService(OrderRepository orderRepository, CartService cartService) {
        this.orderRepository = orderRepository;
         this.cartService = cartService;
    }

    /**
     * Creates a new order from cart items.
     * <p>
     * This method converts the user's cart into an order, including all cart items.
     * It sets the initial order status to "ACCEPTED" and stores shipping and payment details.
     * </p>
     *
     * @param userId          the ID of the user placing the order (nullable for guests)
     * @param items           the list of items from the cart
     * @param total           the total cost of the order
     * @param shippingAddress the shipping address provided by the user
     * @param shippingMethod  the selected shipping method
     * @param paymentMethod   the selected payment method
     * @return the saved order entity
     */
    public Order createOrder(
            Long userId,
            List<OrderItem> items,
            BigDecimal total,
            String shippingAddress,
            String shippingMethod,
            String paymentMethod
    ) {

        Order order = new Order();

        // Basic info
        order.setUserId(userId);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("ACCEPTED");

        // Payment & shipping
        order.setShippingAddress(shippingAddress);
        order.setShippingMethod(shippingMethod);
        order.setPaymentMethod(paymentMethod);

        // Items
        order.setItems(items);
        order.setTotal(total);

        // Link items to order
        for (OrderItem item : items) {
            item.setOrder(order);
        }

        // Get user email
        String email = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            email = auth.getName();
        }

        // Clear cart for logged user
        Order savedOrder = orderRepository.save(order);

        if (email != null) {
            cartService.clearCart(email);
        }

        return savedOrder;
    }

    /**
     * Retrieves all orders for a specific user.
     *
     * @param userId the ID of the user
     * @return a list of orders belonging to the user
     */
    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Retrieves all orders in the system.
     * <p>
     * Typically used by administrators to view all orders.
     * </p>
     *
     * @return a list of all orders sorted by creation date
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Retrieves a single order by its ID, including all order items.
     * <p>
     * Typically used by administrators to view detailed information
     * about a specific order.
     * </p>
     *
     * @param orderId the ID of the order
     * @return the order entity with its items
     * @throws RuntimeException if the order does not exist
     */
    public Order getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Ensure order items are loaded (if using lazy loading)
        if (order.getItems() != null) {
            order.getItems().size();
        }

        return order;
    }

    /**
     * Updates the status of an order.
     * <p>
     * This method allows administrators to change the order status
     * (e.g., "PREPARING", "SHIPPED", "DELIVERED").
     * </p>
     *
     * @param orderId the ID of the order
     * @param status  the new status to set
     * @return the updated order entity
     */
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    
}