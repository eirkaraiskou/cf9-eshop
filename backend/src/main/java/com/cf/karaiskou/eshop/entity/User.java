package com.cf.karaiskou.eshop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Represents a user. <br>
 * Columns: <br>
 *  --id: unique identifier of a user <br>
 *  --first_name: first name of a user <br>
 *  --last_name: last name of a user <br>
 *  --username: username of a user <br>
 *  --password: password of a user (256 HASH) <br>
 *  --email: email of a user <br>
 *  --status: status of a user <br>
 *  --created_at: timestamp of a user creation
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private Boolean status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters --------------------------------------------------------------------------------

    /**
     * Gets the unique ID of the user.
     *
     * @return the unique identifier of the user.
     */
    public Long getId() {
        return id;
    }

    /**
     * Gets the first name of the user.
     *
     * @return the first name of the user.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Gets the last name of the user.
     *
     * @return the last name of the user.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Gets the username of the user.
     *
     * @return the username of the user.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Gets the email of the user.
     *
     * @return the email address of the user.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Gets the password of the user (256 HASH).
     *
     * @return the hashed password of the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Gets the role of the user.
     *
     * @return the role of the user (e.g., ADMIN, USER).
     */
    public String getRole() {
        return role;
    }

    /**
     * Gets the status of the user (active or inactive).
     *
     * @return the status of the user.
     */
    public Boolean getStatus() {
        return status;
    }

    /**
     * Gets the timestamp when the user was created.
     *
     * @return the creation timestamp of the user.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters --------------------------------------------------------------------------------

    /**
     * Sets the unique ID of the user.
     *
     * @param id the unique identifier of the user.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Sets the username of the user.
     *
     * @param username the username of the user.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Sets the first name of the user.
     *
     * @param firstName the first name of the user.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Sets the last name of the user.
     *
     * @param lastName the last name of the user.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Sets the email of the user.
     *
     * @param email the email address of the user.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Sets the password of the user (256 HASH).
     *
     * @param password the hashed password of the user.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Sets the role of the user.
     *
     * @param role the role of the user (e.g., ADMIN, USER).
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Sets the status of the user (active or inactive).
     *
     * @param status the status of the user.
     */
    public void setStatus(Boolean status) {
        this.status = status;
    }

    /**
     * Sets the timestamp when the user was created.
     *
     * @param createdAt the creation timestamp of the user.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

