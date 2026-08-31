package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.Cart;
import com.cf.karaiskou.eshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for managing {@link Cart} entities.
 *
 * <p>
 * Provides basic CRUD operations and custom query methods
 * for retrieving carts associated with users.
 * </p>
 */
public interface CartRepository extends JpaRepository<Cart, Long> {

    /**
     * Finds a cart by its associated user.
     *
     * <p>
     * Since each user has exactly one cart, this method
     * returns at most one result.
     * </p>
     *
     * @param user the user owning the cart
     * @return optional containing the cart if found
     */
    Optional<Cart> findByUser(User user);

    /**
     * Finds a cart by the email of its associated user.
     *
     * <p>
     * This method allows retrieving a cart directly using the user's email
     * without requiring a prior database lookup for the {@link User} entity.
     * </p>
     *
     * <p>
     * Spring Data JPA derives the query automatically by navigating the
     * entity relationship:
     * <pre>
     * Cart -> user -> email
     * </pre>
     * </p>
     *
     * @param email the email of the user owning the cart
     * @return optional containing the cart if found
     */
    Optional<Cart> findByUserEmail(String email);
}