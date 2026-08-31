package com.cf.karaiskou.eshop.utility;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.cf.karaiskou.eshop.entity.User;
import com.cf.karaiskou.eshop.repository.UserRepository;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtility {

    private final UserRepository userRepository;
    private final long jwtExpirationMs;
    private final Key key;


    // Spring will inject the values from application.properties
    public JwtUtility(
            @Value("${jwt.secret-key}") String jwtSecret,
            @Value("${jwt.expiration-time}") long jwtExpirationMs,
            UserRepository userRepository
    ) {

        this.jwtExpirationMs = jwtExpirationMs;
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.userRepository = userRepository;
    }

    public String generateToken(UserDetails user) {
        User currentUser = userRepository.findByEmail(user.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        return Jwts.builder()
                .claim("firstName", currentUser.getFirstName()) 
                .claim("lastName", currentUser.getLastName()) 
                .claim("username", currentUser.getUsername()) 
                .setSubject(user.getUsername())
                .claim("role", user.getAuthorities()
                            .stream()
                            .map(GrantedAuthority::getAuthority)
                            .findFirst().orElse("USER"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getRoleFromToken(String token) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }
}