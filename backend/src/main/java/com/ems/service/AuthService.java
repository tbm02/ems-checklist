package com.ems.service;

import com.ems.dto.LoginRequest;
import com.ems.dto.LoginResponse;
import com.ems.dto.RegisterRequest;
import com.ems.entity.User;
import com.ems.repository.UserRepository;
import com.ems.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {
        // Step 1: Authenticate the user using Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Step 2: Extract authenticated User
        User user = (User) authentication.getPrincipal();

        // Step 3: Capture original firstLogin before changing it
        boolean isFirstLogin = user.isFirstLogin();

        // Step 4: If first login, mark it false for future logins
        if (isFirstLogin) {
            user.setFirstLogin(false);
            userRepository.save(user); // Persist the change
        }

        // Step 5: Generate JWT token and include useful claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("userId", user.getId());
        claims.put("firstLogin", isFirstLogin); // Optional: include in JWT too

        String token = jwtUtil.generateToken(user, claims);

        // Step 6: Return LoginResponse with correct firstLogin value
        return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole().name(),
                user.getId(),
                isFirstLogin // ✅ Return the captured value
        );
    }


    public User register(RegisterRequest registerRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole(User.Role.EMPLOYEE); // Only employees can be registered by admin
        
        return userRepository.save(user);
    }
} 