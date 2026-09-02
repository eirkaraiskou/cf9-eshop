package com.cf.karaiskou.eshop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cf.karaiskou.eshop.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.util.LinkedHashMap;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * REST controller providing application liveness, readiness, and metadata endpoints.
 * 
 * Endpoints:
 * <ul>
 *     <li><b>Liveness:</b> `/api/status` – checks if the app is running</li>
 *     <li><b>Readiness:</b> `/api/health` – checks if the app can connect to DB</li>
 *     <li><b>Metadata:</b> `/api/info` – provides static app information</li>
 * </ul>
 */
@RestController
@Tag(name = "Application Status", description = "Endpoints for application health and metadata")
public class AppStatusController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private AppProperties appProperties;

    private static final Logger logger = LoggerFactory.getLogger(AppStatusController.class);

    @GetMapping("/api/status")
    @Operation(summary = "Check if application is running (liveness)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Application is running")
    })
    public ResponseEntity<Map<String, String>> status() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("status", "OK");
        response.put("message", "🚀 Application is running");

        logger.info("/api/status :: Status: OK");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/health")
    @Operation(summary = "Check application and database readiness")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Database connection status returned")
    })
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new LinkedHashMap<>();

        try (Connection conn = dataSource.getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            var dbProduct = meta.getDatabaseProductVersion();
            var dbConnection = "Connected";

            response.put("database", dbProduct);
            response.put("dbConnection", dbConnection);
            logger.info("api/health :: {} - {}", dbProduct, dbConnection);
        } catch (Exception e) {
            response.put("dbConnection", "Failed: " + e.getMessage());
            logger.warn("/api/health :: Database connection error", e);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/info")
    @Operation(summary = "Get application metadata")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Application metadata returned")
    })
    public ResponseEntity<Map<String, String>> info() {
        var appName = appProperties.getName();
        var appDesc = appProperties.getDesc();
        var appAuthor = appProperties.getAuthor();

        Map<String, String> response = new LinkedHashMap<>();
        response.put("appName", appName);
        response.put("appDesc", appDesc);
        response.put("appAuthor", appAuthor);

        logger.info("/api/info :: {}, {}, {}", appName, appDesc, appAuthor);
        return ResponseEntity.ok(response);
    }
}