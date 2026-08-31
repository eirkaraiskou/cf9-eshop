package com.cf.karaiskou.eshop.service;

import com.cf.karaiskou.eshop.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    private final UserRepository userRepository;

    public StatisticsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns the total number of registered users.
     */
    public long getTotalUsers() {
        return userRepository.count();
    }
}