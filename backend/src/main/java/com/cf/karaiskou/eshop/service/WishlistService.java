package com.cf.karaiskou.eshop.service;

import com.cf.karaiskou.eshop.entity.Product;
import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.entity.Wishlist;
import com.cf.karaiskou.eshop.repository.ProductRepository;
import com.cf.karaiskou.eshop.repository.UserRepository;
import com.cf.karaiskou.eshop.repository.WishlistRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing wishlist operations.
 *
 * <p>
 * Provides business logic for:
 * <ul>
 *     <li>Adding products to wishlist</li>
 *     <li>Removing products from wishlist</li>
 *     <li>Retrieving user wishlist</li>
 * </ul>
 * </p>
 */
@Service
@Transactional
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Add product ---------------------------------------------------------------------------

    /**
     * Adds a product to the user's wishlist.
     *
     * <p>
     * Prevents duplicate entries by checking if the product already exists
     * in the user's wishlist.
     * </p>
     *
     * @param userId the ID of the user
     * @param productId the ID of the product
     * @throws RuntimeException if user or product not found or already exists
     */
    public void addToWishlist(Long userId, Long productId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        boolean exists = wishlistRepository.existsByUserAndProduct(user, product);

        if (exists) {
            throw new RuntimeException("Product already in wishlist");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);

        wishlistRepository.save(wishlist);
    }

    // Remove product ------------------------------------------------------------------------

    /**
     * Removes a product from the user's wishlist.
     *
     * @param userId the ID of the user
     * @param productId the ID of the product
     * @throws RuntimeException if user or product not found
     */
    public void removeFromWishlist(Long userId, Long productId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        wishlistRepository.deleteByUserAndProduct(user, product);
    }

    // Get wishlist --------------------------------------------------------------------------

    /**
     * Retrieves all products in a user's wishlist.
     *
     * @param userId the ID of the user
     * @return list of products in the wishlist
     * @throws RuntimeException if user not found
     */
    public List<Product> getWishlist(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return wishlistRepository.findByUser(user)
                .stream()
                .map(Wishlist::getProduct)
                .toList();
    }
}