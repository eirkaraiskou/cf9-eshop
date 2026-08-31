package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Represents an item within an order in the eShop system.
 * <p>
 * This entity maps to the "order_items" table and stores information about
 * products included in a specific order. Each order item contains a snapshot
 * of product data at the time of purchase.
 * </p>
 */
@Entity
@Table(name = "order_items")
public class OrderItem {

    /**
     * The unique identifier for the order item.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The ID of the product.
     */
    private Long productId;

    /**
     * The name of the product.
     * <p>
     * This is stored as a snapshot and does not update if the product changes.
     * </p>
     */
    private String productName;

    /**
     * The price of a single unit at the time of purchase.
     */
    private BigDecimal price;

    /**
     * The quantity of the product in the order.
     */
    private Integer quantity;

    /**
     * The subtotal cost for this item.
     * <p>
     * Calculated as price multiplied by quantity.
     * </p>
     */
    private BigDecimal subtotal;

    /**
     * The order to which this item belongs.
     */
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // Getters --------------------------------------------------------------------------------

    /**
     * Get the unique identifier of the order item.
     *
     * @return the ID of the order item
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the product ID.
     *
     * @return the product ID
     */
    public Long getProductId() {
        return productId;
    }

    /**
     * Get the product name.
     *
     * @return the product name
     */
    public String getProductName() {
        return productName;
    }

    /**
     * Get the price of the product.
     *
     * @return the price
     */
    public BigDecimal getPrice() {
        return price;
    }

    /**
     * Get the quantity of the product.
     *
     * @return the quantity
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * Get the subtotal cost.
     *
     * @return the subtotal
     */
    public BigDecimal getSubtotal() {
        return subtotal;
    }

    /**
     * Get the order associated with this item.
     *
     * @return the order
     */
    public Order getOrder() {
        return order;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Set the ID of the order item.
     *
     * @param id the ID to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Set the product ID.
     *
     * @param productId the product ID to set
     */
    public void setProductId(Long productId) {
        this.productId = productId;
    }

    /**
     * Set the product name.
     *
     * @param productName the name to set
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * Set the price of the product.
     *
     * @param price the price to set
     */
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    /**
     * Set the quantity of the product.
     *
     * @param quantity the quantity to set
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * Set the subtotal cost.
     *
     * @param subtotal the subtotal to set
     */
    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    /**
     * Set the order associated with this item.
     *
     * @param order the order to set
     */
    public void setOrder(Order order) {
        this.order = order;
    }
}