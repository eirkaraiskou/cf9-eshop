package com.cf.karaiskou.eshop.service;

import com.cf.karaiskou.eshop.entity.Cart;
import com.cf.karaiskou.eshop.entity.CartItem;
import com.cf.karaiskou.eshop.entity.Product;
import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.CartRepository;
import com.cf.karaiskou.eshop.repository.ProductRepository;
import com.cf.karaiskou.eshop.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class responsible for managing cart operations.
 *
 * Provides business logic for:
 * <ul>
 *     <li>Retrieving or creating a cart for a user</li>
 *     <li>Adding products to cart</li>
 *     <li>Removing products from cart</li>
 *     <li>Updating product quantities</li>
 * </ul>
 *
 * This service ensures:
 * <ul>
 *     <li>Each user has exactly one cart</li>
 *     <li>Cart consistency is maintained</li>
 *     <li>Duplicate items are avoided (quantity updated instead)</li>
 * </ul>
 */
@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    /**
     * Constructor injection.
     */
    public CartService(
        CartRepository cartRepository,
        UserRepository userRepository,
        ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * Retrieves the cart of a user or creates one if it does not exist.
     *
     * @param email user email
     * @return existing or newly created cart
     */
    public Cart getOrCreateCart(String email) {
        Optional<Cart> existingCart = cartRepository.findByUserEmail(email);

        if (existingCart.isPresent()) {
            return existingCart.get();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);

        return cartRepository.save(cart);
    }

    /**
     * Adds a product to the cart.
     *
     * <p>
     * If the product already exists in the cart, its quantity is increased.
     * Otherwise, a new cart item is created.
     * </p>
     *
     * @param email user email
     * @param productId product ID
     * @param quantity quantity to add
     */
    public void addToCart(String email, Long productId, int quantity) {
        Cart cart = getOrCreateCart(email);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                cartRepository.save(cart);
                return;
            }
        }

        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);

        cart.getItems().add(newItem);

        cartRepository.save(cart);
    }

    /**
     * Removes a product from the cart.
     *
     * @param email user email
     * @param productId product ID
     */
    public void removeFromCart(String email, Long productId) {
        Cart cart = getOrCreateCart(email);

        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));

        cartRepository.save(cart);
    }

    /**
     * Updates the quantity of a specific product in the cart.
     *
     * <p>
     * If quantity becomes zero or less, the item is removed.
     * </p>
     *
     * @param email user email
     * @param productId product ID
     * @param quantity new quantity
     */
    public void updateQuantity(String email, Long productId, int quantity) {
        Cart cart = getOrCreateCart(email);

        cart.getItems().removeIf(item -> {
            if (item.getProduct().getId().equals(productId)) {
                if (quantity <= 0) return true;
                item.setQuantity(quantity);
            }
            return false;
        });

        cartRepository.save(cart);
    }

    /**
     * Clears the entire cart.
     *
     * @param email user email
     */
    public void clearCart(String email) {
        Cart cart = getOrCreateCart(email);

        cart.getItems().clear();

        cartRepository.save(cart);
    }
}