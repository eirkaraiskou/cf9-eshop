package com.cf.karaiskou.eshop.controller;

import com.cf.karaiskou.eshop.entity.Product;
import com.cf.karaiskou.eshop.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.Map;
import java.util.Optional;

/**
 * Admin controller for managing products.
 */
@RestController
@RequestMapping("/api/admin/products")
@Tag(name = "Admin Products", description = "CRUD operations for product management (admin only)")
public class AdminProductController {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AdminProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * CREATE a new product
     */
    @PostMapping
    @Operation(summary = "Create a new product (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request or failed creation")
    })
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> newProductFields) {
        try {
            Product newProduct = new Product();

            newProductFields.forEach((key, value) -> {
                try {
                    switch (key) {
                        case "name" -> newProduct.setName((String) value);
                        case "description" -> newProduct.setDescription((String) value);
                        case "price" -> newProduct.setPrice(value != null ? ((Number) value).doubleValue() : 0.0);
                        case "quantity" -> newProduct.setQuantity(value != null ? ((Number) value).intValue() : 0);
                        case "available" -> newProduct.setAvailable(value != null && (Boolean) value);
                        case "category" -> newProduct.setCategory((String) value);
                        case "subcategory" -> newProduct.setSubcategory((String) value);
                        case "imageUrl" -> newProduct.setImageUrl((String) value);
                        case "specifications" -> {
                            if (value instanceof Map || value instanceof Iterable) {
                                newProduct.setSpecifications(objectMapper.writeValueAsString(value));
                            } else {
                                newProduct.setSpecifications(value != null ? value.toString() : null);
                            }
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Failed to set field " + key + ": " + e.getMessage());
                }
            });

            Product savedProduct = productRepository.save(newProduct);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create product: " + e.getMessage());
        }
    }

    /**
     * UPDATE a product (PUT) with partial fields and JSON specifications
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product updated successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestBody Map<String, Object> updatedFields) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product existingProduct = optionalProduct.get();

        updatedFields.forEach((key, value) -> {
            try {
                switch (key) {
                    case "name" -> existingProduct.setName((String) value);
                    case "description" -> existingProduct.setDescription((String) value);
                    case "price" -> existingProduct.setPrice(value != null ? ((Number) value).doubleValue() : existingProduct.getPrice());
                    case "quantity" -> existingProduct.setQuantity(value != null ? ((Number) value).intValue() : existingProduct.getQuantity());
                    case "available" -> existingProduct.setAvailable(value != null && (Boolean) value);
                    case "category" -> existingProduct.setCategory((String) value);
                    case "subcategory" -> existingProduct.setSubcategory((String) value);
                    case "imageUrl" -> existingProduct.setImageUrl((String) value);
                    case "specifications" -> {
                        if (value instanceof Map || value instanceof Iterable) {
                            existingProduct.setSpecifications(objectMapper.writeValueAsString(value));
                        } else {
                            existingProduct.setSpecifications(value != null ? value.toString() : null);
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Failed to update field " + key + ": " + e.getMessage());
            }
        });

        productRepository.save(existingProduct);
        return ResponseEntity.ok(existingProduct);
    }

    /**
     * DELETE a product
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product by ID (admin only)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);
        return ResponseEntity.ok().body("Product deleted successfully");
    }
}