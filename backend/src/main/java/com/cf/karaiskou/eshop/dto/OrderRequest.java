package com.cf.karaiskou.eshop.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Data Transfer Object used for creating an order.
 * <p>
 * This DTO is received from the frontend during checkout and contains
 * all necessary information to create an order.
 * </p>
 */
public class OrderRequest {

    private List<OrderItemDTO> items;
    private BigDecimal total;

    private String shippingAddress;
    private String shippingMethod;
    private String paymentMethod;

    // Getters & Setters

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getShippingMethod() {
        return shippingMethod;
    }

    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}