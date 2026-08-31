package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for managing {@link CartItem} entities.
 *
 * <p>
 * Provides basic CRUD operations for cart items.
 * Custom queries can be added if needed for filtering
 * items by cart or product.
 * </p>
 */
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}