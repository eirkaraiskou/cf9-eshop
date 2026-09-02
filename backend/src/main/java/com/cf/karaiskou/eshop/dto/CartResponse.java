package com.cf.karaiskou.eshop.dto;

import java.util.List;

/**
 * Data Transfer Object (DTO) representing a user's cart.
 *
 * This DTO is used to expose only the necessary cart data to the client,
 * avoiding direct exposure of the Cart entity and its internal relationships.
 *
 * Contains:
 * <ul>
 *     <li>Cart ID</li>
 *     <li>List of cart items</li>
 *     <li>Total cart value</li>
 * </ul>
 */
public class CartResponse {

    /**
     * Unique identifier of the cart.
     */
    private Long id;

    /**
     * List of items in the cart.
     */
    private List<CartItemResponse> items;

    /**
     * Total price of all items in the cart.
     */
    private double total;

    public CartResponse() {
    }

    public CartResponse(Long id, List<CartItemResponse> items, double total) {
        this.id = id;
        this.items = items;
        this.total = total;
    }

    // Getters --------------------------------------------------------------------------------

    /**
     * Get the unique identifier of the cart.
     *
     * @return the cart ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the list of items in the cart.
     *
     * @return list of cart items
     */
    public List<CartItemResponse> getItems() {
        return items;
    }

    /**
     * Get the total price of the cart.
     *
     * @return total cart value
     */
    public double getTotal() {
        return total;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Set the unique identifier of the cart.
     *
     * @param id the cart ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Set the list of items in the cart.
     *
     * @param items list of cart items
     */
    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    /**
     * Set the total price of the cart.
     *
     * @param total total cart value
     */
    public void setTotal(double total) {
        this.total = total;
    }
}