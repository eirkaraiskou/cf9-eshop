package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a shopping cart.
 *
 * <p>
 * Each user has exactly one cart (one-to-one relationship).
 * The cart contains multiple {@link CartItem} entries, each representing
 * a product and its quantity.
 * </p>
 *
 * <p>
 * Design decisions:
 * <ul>
 *     <li>One cart per user for simplicity and consistency</li>
 *     <li>Cart items are stored separately to support multiple products</li>
 *     <li>{@code orphanRemoval = true} ensures items are deleted when removed from the cart</li>
 * </ul>
 * </p>
 *
 * <p>
 * This entity is used only for authenticated users.
 * Guest users manage their cart on the frontend (e.g., localStorage).
 * </p>
 */
@Entity
@Table(name = "carts")
public class Cart {

    /**
     * Unique identifier of the cart.
     *
     * <p>
     * Generated automatically by the database using identity strategy.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user who owns this cart.
     *
     * <p>
     * One-to-one relationship ensures each user has exactly one cart.
     * The {@code unique = true} constraint enforces this rule at database level.
     * </p>
     */
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /**
     * List of items contained in the cart.
     *
     * <p>
     * One-to-many relationship:
     * <ul>
     *     <li>Each cart can have multiple items</li>
     *     <li>Each item belongs to exactly one cart</li>
     * </ul>
     * </p>
     *
     * <p>
     * Cascade ALL: propagates persistence operations (persist, merge, remove, etc.)
     * Orphan removal: removes items from DB when removed from this list
     * </p>
     *
     * <p>
     * Initialized as an empty list to avoid {@link NullPointerException}
     * when adding or iterating items.
     * </p>
     */
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    // Getters --------------------------------------------------------------------------------

    /**
     * Returns the unique identifier of the cart.
     *
     * @return cart ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Returns the user associated with this cart.
     *
     * @return owning user
     */
    public User getUser() {
        return user;
    }    

    // Setters --------------------------------------------------------------------------------

    /**
     * Sets the user for this cart.
     *
     * @param user the user who owns the cart
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Returns the list of cart items.
     *
     * @return list of {@link CartItem}
     */
    public List<CartItem> getItems() {
        return items;
    }

    /**
     * Sets the cart items.
     *
     * <p>
     * Replaces the current list of items.
     * </p>
     *
     * @param items list of cart items
     */
    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}