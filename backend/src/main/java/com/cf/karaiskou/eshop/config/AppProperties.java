package com.cf.karaiskou.eshop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Holds application-level custom properties loaded from application.properties.
 * 
 * This class provides access to configurable values such as the application name and author.
 * These values can be injected into other beans or used as defaults in DTOs.
 *
 */
@Component
public class AppProperties {

    /** The name of the application, loaded from 'app.name' property */
    @Value("${app.name}")
    private String name;

    /** The description of the application, loaded from 'app.desc' property */
    @Value("${app.desc}")
    private String desc;

    /** The author of the application, loaded from 'app.author' property */
    @Value("${app.author}")
    private String author;

    /**
     * Gets the application name.
     * @return the name of the application
     */
    public String getName() {
        return name;
    }

     /**
     * Gets the application description.
     * @return the description of the application
     */
    public String getDesc() {
        return desc;
    }

    /**
     * Gets the author name.
     * @return the author of the application
     */
    public String getAuthor() {
        return author;
    }
}