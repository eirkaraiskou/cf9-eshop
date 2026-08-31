package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents a product in the eShop system.
 * <p>
 * This entity maps to the "Product" table in the database and stores information about products
 * available in the store, such as name, description, price, category, availability status, and stock quantity.
 * </p>
 */
@Entity
@Table(name="Products")
public class Product {

    /**
     * The unique identifier for the product.
     * <p>
     * This ID is automatically generated and is used to identify the product in the database.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the product.
     * <p>
     * This is the name that will be displayed to the user.
     * </p>
     */
    private String name;

    /**
     * A detailed description of the product.
     * <p>
     * This description provides additional details about the product to the customer.
     * </p>
     */
    private String description;

    /**
     * Specifications of the product.
     * <p>
     * The specifications provide key characteristics about the product to the customer.
     * </p>
     */
    private String specifications;

    /**
     * The price of the product.
     * <p>
     * This price will be used during checkout and represents the cost for a single unit of the product.
     * </p>
     */
    private double price;

    /**
     * The URL of the product's image.
     * <p>
     * This URL is used to display the product image on the eShop's UI.
     * </p>
     */
    private String imageUrl;

    /**
     * The category to which the product belongs (e.g., "Computers", "Mobile").
     * <p>
     * This field helps categorize products, enabling users to browse products based on categories.
     * </p>
     */
    private String category;

    /**
     * The subcategory to which the product belongs (e.g., "Desktop", "Laptop").
     * <p>
     * This field helps categorize products, enabling users to filter products based on subcategories.
     * </p>
     */
    private String subcategory;

    /**
     * Availability status of the product.
     * <p>
     * This boolean indicates whether the product is available for purchase. If set to true, the product
     * is available for purchase. If false, the product is considered out of stock or discontinued.
     * </p>
     */
    private boolean available;

    /**
     * The quantity of the product in stock.
     * <p>
     * This field tracks how many units of the product are available in the inventory.
     * </p>
     */
    private Integer quantity;

    // Getters --------------------------------------------------------------------------------

    /**
     * Get the unique identifier of the product.
     *
     * @return the ID of the product
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the name of the product.
     *
     * @return the name of the product
     */
    public String getName() {
        return name;
    }

    /**
     * Get the description of the product.
     *
     * @return the description of the product
     */
    public String getDescription() {
        return description;
    }

    /**
     * Get the specifications of the product.
     *
     * @return the specifications of the product
     */
    public String getSpecifications() {
        return specifications;
    }

    /**
     * Get the price of the product.
     *
     * @return the price of the product
     */
    public double getPrice() {
        return price;
    }

    /**
     * Get the image URL of the product.
     *
     * @return the image URL of the product
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Get the category of the product.
     *
     * @return the category of the product
     */
    public String getCategory() {
        return category;
    }

    /**
     * Get the subcategory of the product.
     *
     * @return the subcategory of the product
     */
    public String getSubcategory() {
        return subcategory;
    }

    /**
     * Get the availability status of the product.
     *
     * @return true if the product is available, false otherwise
     */
    public boolean isAvailable() {
        return available;
    }

    /**
     * Get the quantity of the product in stock.
     *
     * @return the quantity of the product
     */
    public Integer getQuantity() {
        return quantity;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Set the unique identifier of the product.
     *
     * @param id the ID to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Set the name of the product.
     *
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Set the description of the product.
     *
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Set the specifications of the product.
     *
     * @param specifications the specifications to set
     */
    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    /**
     * Set the price of the product.
     *
     * @param price the price to set
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Set the image URL of the product.
     *
     * @param imageUrl the image URL to set
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Set the category of the product.
     *
     * @param category the category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Set the category of the product.
     *
     * @param category the category to set
     */
    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    /**
     * Set the availability status of the product.
     *
     * @param available the availability status to set
     */
    public void setAvailable(boolean available) {
        this.available = available;
    }

    /**
     * Set the quantity of the product in stock.
     *
     * @param quantity the quantity to set
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}