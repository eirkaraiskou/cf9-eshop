package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository interface for {@link Product} entity.
 * <p>
 * Provides CRUD operations and custom query methods for accessing products in the database.
 * </p>
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Find all products belonging to a specific category.
     *
     * @param category the category name (e.g., "laptops", "phones")
     * @return list of products in the given category
     */
    List<Product> findByCategory(String category);

    /**
     * Find all products that are available (quantity > 0).
     *
     * @return list of available products
     */
    @Query("SELECT p FROM Product p WHERE p.quantity > 0")
    List<Product> findByIsAvailable();

    /**
     * Find all products by category that are also available (quantity > 0).
     *
     * @param category the category name
     * @return list of available products in the given category
     */
    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.quantity > 0")
    List<Product> findByCategoryAndIsAvailable(String category);

    /**
     * Search products by ID or partial name (case-insensitive).
     *
     * @param id the product ID (can be null)
     * @param name the product name to search for
     * @return list of matching products
     */
    @Query("SELECT p FROM Product p WHERE (:id IS NULL OR p.id = :id) AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Product> searchByIdOrName(@Param("id") Long id, @Param("name") String name);

}