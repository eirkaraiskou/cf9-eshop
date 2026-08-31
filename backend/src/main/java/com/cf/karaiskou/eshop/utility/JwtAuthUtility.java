package com.cf.karaiskou.eshop.utility;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter.
 * <p>
 * This filter intercepts each HTTP request and checks for a valid JWT in the Authorization header.
 * If a valid token is present, it sets the authentication in the Spring Security context.
 * <p>
 * The filter extends {@link OncePerRequestFilter} to ensure it runs only once per request.
 */
@Component
public class JwtAuthUtility extends OncePerRequestFilter {

    private final JwtUtility jwtUtility;
    private final UserDetailsService userDetailsService;

    /**
     * Constructor injection for required dependencies.
     *
     * @param jwtUtility         utility class for JWT operations (generate, validate, extract username)
     * @param userDetailsService service to load user details from the database
     */
    public JwtAuthUtility(JwtUtility jwtUtility, UserDetailsService userDetailsService) {
        this.jwtUtility = jwtUtility;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Filters incoming requests and checks for JWT token in Authorization header.
     * <p>
     * If a valid JWT is found, the corresponding {@link UserDetails} is loaded and
     * the {@link SecurityContextHolder} is updated with an authenticated token.
     *
     * @param request     the HTTP request
     * @param response    the HTTP response
     * @param filterChain the filter chain
     * @throws ServletException in case of servlet errors
     * @throws IOException      in case of I/O errors
     */
    @Operation(summary = "JWT request filter for authentication")
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtility.validateToken(token)) {
                String username = jwtUtility.getUsernameFromToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authenticated user in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
            else {
                System.out.println("[JWT FILTER] Invalid JWT token");
            }
        }
        else {
            System.out.println("[JWT FILTER] No Bearer token found");
        }

        filterChain.doFilter(request, response);
    }
}