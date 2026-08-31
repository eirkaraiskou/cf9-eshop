package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Represents a wishlist entry. <br>
 * Columns: <br>
 *  --id: unique identifier of the wishlist entry <br>
 *  --user_id: reference to the user who owns the wishlist <br>
 *  --product_id: reference to the product added to the wishlist <br>
 *  --created_at: timestamp when the product was added to the wishlist
 *
 * <p>
 * A wishlist entry connects a user with a product.
 * Each user can add multiple products to their wishlist,
 * but cannot add the same product more than once.
 * </p>
 */
@Entity
@Table(
        name = "wishlists",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "product_id"})
        }
)
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user who owns this wishlist entry.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * The product added to the wishlist.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /**
     * The timestamp when the product was added to the wishlist.
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Constructors ---------------------------------------------------------------------------

    public Wishlist() {
    }

    public Wishlist(User user, Product product) {
        this.user = user;
        this.product = product;
    }

    // Lifecycle -----------------------------------------------------------------------------

    /**
     * Sets the creation timestamp before persisting.
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters --------------------------------------------------------------------------------

    /**
     * Gets the unique ID of the wishlist entry.
     *
     * @return the unique identifier of the wishlist entry.
     */
    public Long getId() {
        return id;
    }

    /**
     * Gets the user who owns this wishlist entry.
     *
     * @return the user of the wishlist entry.
     */
    public User getUser() {
        return user;
    }

    /**
     * Gets the product added to the wishlist.
     *
     * @return the product of the wishlist entry.
     */
    public Product getProduct() {
        return product;
    }

    /**
     * Gets the timestamp when the wishlist entry was created.
     *
     * @return the creation timestamp.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Sets the unique ID of the wishlist entry.
     *
     * @param id the unique identifier of the wishlist entry.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Sets the user who owns this wishlist entry.
     *
     * @param user the user of the wishlist entry.
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Sets the product added to the wishlist.
     *
     * @param product the product of the wishlist entry.
     */
    public void setProduct(Product product) {
        this.product = product;
    }

    /**
     * Sets the creation timestamp of the wishlist entry.
     *
     * @param createdAt the creation timestamp.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}