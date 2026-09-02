package com.cf.karaiskou.eshop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cf.karaiskou.eshop.entity.Product;
import com.cf.karaiskou.eshop.repository.ProductRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for product operations.
 * 
 * Provides endpoints to retrieve products, filter by category,
 * and fetch individual product details.
 *
 */
@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Endpoints for retrieving product data")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Retrieve a list of all products in the catalog")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of products")
    })
    public ResponseEntity<List<Product>> getAllProducts() {
        logger.info("api/products :: Get all products");
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/available")
    @Operation(summary = "Get all available products", description = "Retrieve a list of products that are in stock")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of available products")
    })
    public ResponseEntity<List<Product>> getAvailableProducts() {
        logger.info("api/products/available :: Get all available products");
        return ResponseEntity.ok(productRepository.findByIsAvailable());
    }

    @GetMapping("/search")
    @Operation(summary = "Search products", description = "Search products by name (partial) or by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of matching products")
    })
    public List<Product> searchProducts(
            @Parameter(description = "Query parameter to search by product name or ID", example = "Laptop") 
            @RequestParam("query") String query) {

        Long id = null;
        try {
            id = Long.parseLong(query);
        } catch (NumberFormatException e) {
            // ignore if not a number
        }

        logger.info("api/products/search :: Search products with query param {}", query);
        return productRepository.searchByIdOrName(id, query);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get products by category", description = "Retrieve products belonging to a specific category")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of products in the category")
    })
    public ResponseEntity<List<Product>> getProductsByCategory(
            @Parameter(description = "Category of products to retrieve", example = "Electronics")
            @PathVariable String category) {

        logger.info("api/products/category :: Get all products of category {}", category);
        return ResponseEntity.ok(productRepository.findByCategory(category));
    }

    @GetMapping("/category/{category}/available")
    @Operation(summary = "Get available products by category", description = "Retrieve available products for a specific category")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of available products in the category")
    })
    public ResponseEntity<List<Product>> getAvailableProductsByCategory(
            @Parameter(description = "Category of available products to retrieve", example = "Electronics")
            @PathVariable String category) {

        logger.info("api/products/category/available :: Get all available products of category {}", category);
        return ResponseEntity.ok(productRepository.findByCategoryAndIsAvailable(category));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieve a single product by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved product"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<Product> getProductById(
            @Parameter(description = "ID of the product to retrieve", example = "1")
            @PathVariable Long id) {

        Optional<Product> product = productRepository.findById(id);

        logger.info("api/products/category/id :: Get product with id: {}", id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}