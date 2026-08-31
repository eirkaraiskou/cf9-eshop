package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository interface for managing {@link OrderItem} entities.
 * <p>
 * Provides basic CRUD operations and query methods for order items.
 * Typically used internally when handling orders.
 * </p>
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    /**
     * Retrieve all items belonging to a specific order.
     *
     * @param orderId the ID of the order
     * @return a list of items associated with the order
     */
    List<OrderItem> findByOrderId(Long orderId);
}