package com.ems.controller;

import com.ems.dto.LeaveRequest;
import com.ems.entity.*;
import com.ems.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
@CrossOrigin(origins = "*")
public class EmployeeController {
    
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
    @PostMapping("/leaves")
    public ResponseEntity<Leave> applyLeave(@Valid @RequestBody LeaveRequest leaveRequest) {
        Long employeeId = getCurrentUserId();
        Leave leave = leaveService.applyLeave(leaveRequest, employeeId);
        return ResponseEntity.ok(leave);
    }
    
    @GetMapping("/leaves")
    public ResponseEntity<List<Leave>> getMyLeaves() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(leaveService.getEmployeeLeaves(employeeId));
    }
    
    @GetMapping("/leaves/upcoming")
    public ResponseEntity<List<Leave>> getUpcomingLeaves() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(leaveService.getUpcomingApprovedLeaves(employeeId));
    }
    
    // Projects
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getMyProjects() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(projectService.getEmployeeProjects(employeeId));
    }
    
    // Policies
    @GetMapping("/policies")
    public ResponseEntity<List<Policy>> getPolicies() {
        return ResponseEntity.ok(policyService.getActivePolicies());
    }
    
    // Profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        Long employeeId = getCurrentUserId();
        User user = userService.getUserById(employeeId);
        user.setPassword(null); // Remove password from response
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User userUpdate) {
        Long employeeId = getCurrentUserId();
        User user = userService.updateProfile(employeeId, userUpdate);
        user.setPassword(null); // Remove password from response
        return ResponseEntity.ok(user);
    }
    
    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardData() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(dashboardService.getEmployeeDashboardData(employeeId));
    }
    
    // Notifications
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUserNotifications(employeeId));
    }
    
    @GetMapping("/notifications/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        Long employeeId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUnreadNotifications(employeeId));
    }
    
    @PutMapping("/notifications/{notificationId}/read")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/notifications/read-all")
    public ResponseEntity<Void> markAllNotificationsAsRead() {
        Long employeeId = getCurrentUserId();
        notificationService.markAllAsRead(employeeId);
        return ResponseEntity.ok().build();
    }
    
    // Announcements
    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAnnouncements() {
        return ResponseEntity.ok(announcementService.getActiveAnnouncements());
    }
    
    // TODO: Add resignation endpoints
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getId();
    }
} 