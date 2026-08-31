package com.cf.karaiskou.eshop.repository;

import com.cf.karaiskou.eshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

/**
 * Repository interface for managing {@link Order} entities.
 * <p>
 * This interface provides CRUD operations and custom query methods
 * for accessing and managing orders stored in the database.
 * </p>
 */
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Retrieve all orders associated with a specific user.
     * <p>
     * This method is typically used to display order history
     * for a logged-in user.
     * </p>
     *
     * @param userId the ID of the user
     * @return a list of orders belonging to the user
     */
    List<Order> findByUserId(Long userId);

    /**
     * Retrieve all orders sorted by creation date (newest first).
     * <p>
     * Useful for admin dashboards and order management views.
     * </p>
     *
     * @return a list of orders sorted by creation timestamp in descending order
     */
    List<Order> findAllByOrderByCreatedAtDesc();

    /**
     * Returns the total sum of all orders.
     * <p>
     * Useful for generating overall revenue statistics.
     * </p>
     *
     * @return the total amount of all orders as a {@link BigDecimal}
     */
    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o")
    BigDecimal getTotalAmount();

    /**
     * Returns the total number of orders per day for the last 7 days.
     * <p>
     * Each entry contains the date and the count of orders for that day.
     * </p>
     *
     * @return a list of Object arrays where index 0 = date, index 1 = order count
     */
    @Query("SELECT FUNCTION('DATE', o.createdAt) as day, COUNT(o) " +
        "FROM Order o " +
        "WHERE o.createdAt >= :startDate " +
        "GROUP BY FUNCTION('DATE', o.createdAt) " +
        "ORDER BY day ASC")
    List<Object[]> countOrdersPerDaySince(java.time.LocalDateTime startDate);

    /**
     * Returns the count of orders grouped by shipping method.
     * <p>
     * Useful for analyzing preferred shipping options.
     * </p>
     *
     * @return a list of Object arrays where index 0 = shipping method, index 1 = count
     */
    @Query("SELECT o.shippingMethod, COUNT(o) FROM Order o GROUP BY o.shippingMethod")
    List<Object[]> countByShippingMethod();

    /**
     * Returns the count of orders grouped by payment method.
     * <p>
     * Useful for analyzing preferred payment options.
     * </p>
     *
     * @return a list of Object arrays where index 0 = payment method, index 1 = count
     */
    @Query("SELECT o.paymentMethod, COUNT(o) FROM Order o GROUP BY o.paymentMethod")
    List<Object[]> countByPaymentMethod();

    /**
     * Returns the count of orders grouped by status.
     * <p>
     * Useful for tracking order progress and completion rates.
     * </p>
     *
     * @return a list of Object arrays where index 0 = status, index 1 = count
     */
    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countByStatus();
}