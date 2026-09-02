package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;

/**
 * Entity representing an item inside a shopping cart.
 *
 * Each cart item corresponds to a specific product and a quantity selected
 * by the user. A cart can contain multiple cart items, but each cart item
 * is associated with exactly one cart.
 *
 * Design decisions:
 * <ul>
 *     <li>Separate entity to support multiple products per cart</li>
 *     <li>Quantity stored per product</li>
 *     <li>Linked to {@link Product} for product details</li>
 * </ul>
 */
@Entity
@Table(name = "cart_items")
public class CartItem {

    /**
     * Unique identifier of the cart item.
     *
     * <p>
     * Generated automatically by the database using identity strategy.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The cart that this item belongs to.
     *
     * <p>
     * Many-to-one relationship:
     * <ul>
     *     <li>Multiple cart items can belong to the same cart</li>
     *     <li>Each cart item belongs to exactly one cart</li>
     * </ul>
     * </p>
     */
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    /**
     * The product associated with this cart item.
     *
     * <p>
     * Many-to-one relationship:
     * <ul>
     *     <li>Multiple cart items can reference the same product</li>
     *     <li>Each cart item references exactly one product</li>
     * </ul>
     * </p>
     */
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /**
     * Quantity of the product in the cart.
     *
     * <p>
     * Must be a positive integer.
     * </p>
     */
    @Column(nullable = false)
    private int quantity;

    // Getters --------------------------------------------------------------------------------

    /**
     * Returns the unique identifier of the cart item.
     *
     * @return cart item ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Returns the cart associated with this item.
     *
     * @return cart
     */
    public Cart getCart() {
        return cart;
    }

    /**
     * Returns the product associated with this item.
     *
     * @return product
     */
    public Product getProduct() {
        return product;
    }

    /**
     * Returns the quantity of the product.
     *
     * @return quantity
     */
    public int getQuantity() {
        return quantity;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Sets the cart for this item.
     *
     * @param cart the cart this item belongs to
     */
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    /**
     * Sets the product for this item.
     *
     * @param product the product associated with this item
     */
    public void setProduct(Product product) {
        this.product = product;
    }

    /**
     * Sets the quantity of the product.
     *
     * <p>
     * Should be greater than zero.
     * </p>
     *
     * @param quantity product quantity
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}