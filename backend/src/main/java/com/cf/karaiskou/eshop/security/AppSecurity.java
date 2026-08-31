package com.cf.karaiskou.eshop.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cf.karaiskou.eshop.utility.JwtAuthUtility;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Spring Security configuration.
 * <p>
 * Configures authentication using {@link CustomUserDetailsService} and password encoding.
 * Secures endpoints and disables session management (stateless) for JWT support.
 */
@EnableMethodSecurity
@Configuration
public class AppSecurity {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthUtility jwtAuthUtility;

    /**
     * Constructor injection of {@link CustomUserDetailsService} and {@link JwtAuthUtility}.
     *
     * @param userDetailsService service that loads user details from DB
     * @param jwtAuthUtility     JWT filter that validates tokens in incoming requests
     */
    public AppSecurity(CustomUserDetailsService userDetailsService, JwtAuthUtility jwtAuthUtility) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthUtility = jwtAuthUtility;
    }

    /**
     * Password encoder bean.
     * <p>
     * Used to hash passwords in the database and verify credentials.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication manager bean.
     * <p>
     * Used to authenticate users during login.
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
        AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder);

        return authBuilder.build();
    }

    /**
     * Security filter chain.
     * <p>
     * Configures which endpoints are public and which require authentication.
     * Adds {@link JwtAuthUtility} before the default {@link UsernamePasswordAuthenticationFilter}.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            // Public
            .authorizeHttpRequests(auth -> auth
                // swagger
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()
                
                // Public
                .requestMatchers(
                    "/api/status",
                    "/api/info",
                    "/api/health",
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/products/**",
                    "/api/orders/checkout"
                ).permitAll()
            
                // Admin
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                .anyRequest().authenticated()
                
            )
            // Exceptions
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                    String message = "Unauthorized";

                    if ("USER_DISABLED".equals(authException.getMessage())) {
                        message = "USER_DISABLED";
                    }

                    response.getWriter().write("{\"error\": \"" + message + "\"}");
                })
            )
            // Session management
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Add JWT filter before Spring Security's authentication filter
            .addFilterBefore(jwtAuthUtility, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}