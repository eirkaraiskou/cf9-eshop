package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.Wishlist;
import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link Wishlist} entities.
 *
 * <p>
 * Provides methods for:
 * <ul>
 *     <li>Retrieving wishlist entries for a specific user</li>
 *     <li>Checking if a product is already in a user's wishlist</li>
 *     <li>Adding and removing wishlist entries</li>
 * </ul>
 * </p>
 */
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    /**
     * Finds all wishlist entries for a given user.
     *
     * @param user the user whose wishlist is being retrieved
     * @return a list of wishlist entries
     */
    List<Wishlist> findByUser(User user);

    /**
     * Finds a wishlist entry by user and product.
     *
     * <p>
     * Used to check if a product already exists in a user's wishlist.
     * </p>
     *
     * @param user the user
     * @param product the product
     * @return an Optional containing the wishlist entry if found
     */
    Optional<Wishlist> findByUserAndProduct(User user, Product product);

    /**
     * Checks if a product is already in a user's wishlist.
     *
     * <p>
     * This is more efficient than fetching the entire entity.
     * </p>
     *
     * @param user the user
     * @param product the product
     * @return true if the product exists in the wishlist, false otherwise
     */
    boolean existsByUserAndProduct(User user, Product product);

    /**
     * Deletes a wishlist entry by user and product.
     *
     * <p>
     * Used when removing a product from the wishlist.
     * </p>
     *
     * @param user the user
     * @param product the product
     */
    void deleteByUserAndProduct(User user, Product product);
}