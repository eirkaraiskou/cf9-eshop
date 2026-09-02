package com.cf.karaiskou.eshop.dto;

/**
 * Data Transfer Object (DTO) representing a cart item.
 *
 * Contains product-related information along with quantity and pricing details.
 */
public class CartItemResponse {

    /**
     * ID of the product.
     */
    private Long productId;

    /**
     * Name of the product.
     */
    private String productName;

    /**
     * Price of a single product unit.
     */
    private double price;

    /**
     * Quantity of the product in the cart.
     */
    private int quantity;

    /**
     * Subtotal price (price * quantity).
     */
    private double subtotal;

    // Getters --------------------------------------------------------------------------------

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getSubtotal() {
        return subtotal;
    }

    // Setters --------------------------------------------------------------------------------

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}