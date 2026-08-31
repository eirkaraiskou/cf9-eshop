package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Represents a customer order in the eShop system.
 * <p>
 * This entity maps to the "orders" table in the database and stores information about
 * completed purchases. An order is created when a user proceeds with checkout and
 * represents a snapshot of the cart at that moment.
 * </p>
 */
@Entity
@Table(name = "orders")
public class Order {

    /**
     * The unique identifier for the order.
     * <p>
     * This ID is automatically generated and is used to identify the order in the database.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The ID of the user who placed the order.
     * <p>
     * This field may be null in case of guest checkout.
     * </p>
     */
    private Long userId;

    /**
     * The shipping address provided by the user.
     * <p>
     * This address is used to deliver the order.
     * </p>
     */
    private String shippingAddress;

    /**
     * The selected shipping method.
     * <p>
     * Examples include BOXNOW, ELTA, or SPEEDEX.
     * </p>
     */
    private String shippingMethod;

    /**
     * The selected payment method.
     * <p>
     * Examples include CARD, PAYPAL, or COD (Cash on Delivery).
     * </p>
     */
    private String paymentMethod;

    /**
     * The current status of the order.
     * <p>
     * Examples include ACCEPTED, PREPARING, SHIPPED, or DELIVERED.
     * </p>
     */
    private String status;

    /**
     * The total cost of the order.
     * <p>
     * This value represents the sum of all order items.
     * </p>
     */
    private BigDecimal total;

    /**
     * The date and time when the order was created.
     */
    private LocalDateTime createdAt;

    /**
     * The list of items included in the order.
     * <p>
     * Each item represents a product snapshot at the time of purchase.
     * </p>
     */
    
    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    // Getters --------------------------------------------------------------------------------

    /**
     * Get the unique identifier of the order.
     *
     * @return the ID of the order
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the user ID associated with the order.
     *
     * @return the user ID or null if guest
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Get the shipping address of the order.
     *
     * @return the shipping address
     */
    public String getShippingAddress() {
        return shippingAddress;
    }

    /**
     * Get the shipping method of the order.
     *
     * @return the shipping method
     */
    public String getShippingMethod() {
        return shippingMethod;
    }

    /**
     * Get the payment method of the order.
     *
     * @return the payment method
     */
    public String getPaymentMethod() {
        return paymentMethod;
    }

    /**
     * Get the current status of the order.
     *
     * @return the order status
     */
    public String getStatus() {
        return status;
    }

    /**
     * Get the total cost of the order.
     *
     * @return the total cost
     */
    public BigDecimal getTotal() {
        return total;
    }

    /**
     * Get the creation date of the order.
     *
     * @return the creation timestamp
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Get the list of items in the order.
     *
     * @return the list of order items
     */
    public List<OrderItem> getItems() {
        return items;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Set the unique identifier of the order.
     *
     * @param id the ID to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Set the user ID for the order.
     *
     * @param userId the user ID to set
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Set the shipping address.
     *
     * @param shippingAddress the address to set
     */
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    /**
     * Set the shipping method.
     *
     * @param shippingMethod the shipping method to set
     */
    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    /**
     * Set the payment method.
     *
     * @param paymentMethod the payment method to set
     */
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    /**
     * Set the order status.
     *
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Set the total cost of the order.
     *
     * @param total2 the total cost to set
     */
    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    /**
     * Set the creation date of the order.
     *
     * @param createdAt the timestamp to set
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Set the list of order items.
     *
     * @param items the items to set
     */
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}