package com.ems.service;

import com.ems.entity.User;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllEmployees() {
        return userRepository.findByRole(User.Role.EMPLOYEE);
    }
    
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User updateProfile(Long userId, User userUpdate) {
        User user = getUserById(userId);
        
        // Update allowed fields
        if (userUpdate.getFirstName() != null) {
            user.setFirstName(userUpdate.getFirstName());
        }
        if (userUpdate.getLastName() != null) {
            user.setLastName(userUpdate.getLastName());
        }
        if (userUpdate.getEmail() != null) {
            user.setEmail(userUpdate.getEmail());
        }
        if (userUpdate.getPhoneNumber() != null) {
            user.setPhoneNumber(userUpdate.getPhoneNumber());
        }
        if (userUpdate.getProfilePicture() != null) {
            user.setProfilePicture(userUpdate.getProfilePicture());
        }
        
        return userRepository.save(user);
    }
    
    public long getTotalEmployeeCount() {
        return userRepository.countActiveEmployees();
    }
} 