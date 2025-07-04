package com.ems.dto;

public class LoginResponse {
    
    private String token;
    private String username;
    private String role;
    private Long userId;
    private boolean firstLogin;


    public LoginResponse() {}
    
    public LoginResponse(String token, String username, String role, Long userId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.userId = userId;
    }

    public LoginResponse(String token, String username, String role, Long userId, boolean firstLogin) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.userId = userId;
        this.firstLogin = firstLogin;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public boolean getfirstLogin() { return firstLogin; }
    public void setfirstLogin(boolean firstLogin) { this.firstLogin = firstLogin; }
} 