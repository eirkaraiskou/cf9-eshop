package com.cf.karaiskou.eshop.mapper;

import com.cf.karaiskou.eshop.dto.CartItemResponse;
import com.cf.karaiskou.eshop.dto.CartResponse;
import com.cf.karaiskou.eshop.entity.Cart;
import com.cf.karaiskou.eshop.entity.CartItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper class responsible for converting Cart-related entities
 * into their corresponding DTO representations.
 *
 * This class ensures that internal entity structures are not exposed
 * directly to the client and that only the necessary data is returned.
 *
 * Responsibilities:
 * <ul>
 *     <li>Convert Cart → CartResponse</li>
 *     <li>Convert CartItem → CartItemResponse</li>
 * </ul>
 */
@Component
public class CartMapper {

    /**
     * Converts a Cart entity into a CartResponse DTO.
     *
     * @param cart the cart entity
     * @return mapped CartResponse DTO
     */
    public CartResponse toCartResponse(Cart cart) {
        if (cart == null) {
            return null;
        }

        List<CartItemResponse> items = mapCartItems(cart.getItems());

        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setItems(items);
        response.setTotal(calculateTotal(items)); // ✅ NEW

        return response;
    }

    /**
     * Converts a list of CartItem entities into a list of CartItemResponse DTOs.
     *
     * @param items list of cart items
     * @return list of mapped DTOs
     */
    private List<CartItemResponse> mapCartItems(List<CartItem> items) {
        if (items == null) {
            return List.of();
        }

        return items.stream()
                .map(this::toCartItemResponse)
                .collect(Collectors.toList());
    }

    /**
     * Converts a CartItem entity into a CartItemResponse DTO.
     *
     * @param item the cart item entity
     * @return mapped CartItemResponse DTO
     */
    private CartItemResponse toCartItemResponse(CartItem item) {
        if (item == null || item.getProduct() == null) {
            return null;
        }

        double price = item.getProduct().getPrice();
        int quantity = item.getQuantity();

        CartItemResponse dto = new CartItemResponse();
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setPrice(price);
        dto.setQuantity(quantity);
        dto.setSubtotal(price * quantity); // ✅ NEW

        return dto;
    }

    /**
     * Calculates the total price of all cart items.
     *
     * @param items list of cart item DTOs
     * @return total cart value
     */
    private double calculateTotal(List<CartItemResponse> items) {
        return items.stream()
                .mapToDouble(CartItemResponse::getSubtotal)
                .sum();
    }
}