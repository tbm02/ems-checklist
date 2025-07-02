package com.ems.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private LeaveService leaveService;
    
    @Autowired
    private AnnouncementService announcementService;
    
    public Map<String, Object> getAdminDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Basic statistics
        dashboardData.put("totalEmployees", userService.getTotalEmployeeCount());
        dashboardData.put("activeProjects", projectService.getTotalActiveProjectCount());
        dashboardData.put("leaveRequestsThisMonth", leaveService.getLeaveRequestsCountThisMonth());
        
        // Recent data
        dashboardData.put("pendingLeaves", leaveService.getPendingLeaves());
        dashboardData.put("recentAnnouncements", announcementService.getHighPriorityAnnouncements());
        
        return dashboardData;
    }
    
    public Map<String, Object> getEmployeeDashboardData(Long employeeId) {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Employee-specific data
        dashboardData.put("myProjects", projectService.getEmployeeProjects(employeeId));
        dashboardData.put("upcomingLeaves", leaveService.getUpcomingApprovedLeaves(employeeId));
        dashboardData.put("announcements", announcementService.getActiveAnnouncements());
        
        // TODO: Add leave balance calculation
        dashboardData.put("leaveBalance", 25); // Stub value
        
        return dashboardData;
    }
} 