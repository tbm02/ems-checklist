package com.ems.controller;

import com.ems.entity.*;
import com.ems.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private LeaveService leaveService;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PolicyService policyService;
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private ResignationService resignationService;
    
    @Autowired
    private AnnouncementService announcementService;
    
    @Autowired
    private DashboardService dashboardService;
    
    // Leave Management
    @GetMapping("/leaves")
    public ResponseEntity<List<Leave>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }
    
    @GetMapping("/leaves/pending")
    public ResponseEntity<List<Leave>> getPendingLeaves() {
        return ResponseEntity.ok(leaveService.getPendingLeaves());
    }
    
    @PutMapping("/leaves/{leaveId}/approve")
    public ResponseEntity<Leave> approveLeave(@PathVariable Long leaveId) {
        Long adminId = getCurrentUserId();
        Leave leave = leaveService.approveLeave(leaveId, adminId);
        return ResponseEntity.ok(leave);
    }
    
    @PutMapping("/leaves/{leaveId}/reject")
    public ResponseEntity<Leave> rejectLeave(@PathVariable Long leaveId, @RequestParam String reason) {
        Long adminId = getCurrentUserId();
        Leave leave = leaveService.rejectLeave(leaveId, adminId, reason);
        return ResponseEntity.ok(leave);
    }
    
    // Employee Management
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getAllEmployees() {
        return ResponseEntity.ok(userService.getAllEmployees());
    }
    
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<User> getEmployee(@PathVariable Long employeeId) {
        User user = userService.getUserById(employeeId);
        user.setPassword(null); // Remove password from response
        return ResponseEntity.ok(user);
    }
    
    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardData() {
        return ResponseEntity.ok(dashboardService.getAdminDashboardData());
    }
    
    // Notifications
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        Long adminId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUserNotifications(adminId));
    }
    
    @PutMapping("/notifications/{notificationId}/read")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
    
    // TODO: Add endpoints for policies, projects, resignations, announcements
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getId();
    }
} 