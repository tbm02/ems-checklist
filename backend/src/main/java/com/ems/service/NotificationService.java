package com.ems.service;

import com.ems.entity.*;
import com.ems.repository.NotificationRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Notification> getUserNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(user);
    }
    
    public List<Notification> getUnreadNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return notificationRepository.findByRecipientAndReadOrderByCreatedAtDesc(user, false);
    }
    
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        notification.setRead(true);
        notificationRepository.save(notification);
    }
    
    public void markAllAsRead(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Notification> unreadNotifications = notificationRepository.findByRecipientAndRead(user, false);
        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }
    
    public long getUnreadCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return notificationRepository.countUnreadNotifications(user);
    }
    
    // Notification creation methods
    public void notifyAdminsAboutLeaveRequest(Leave leave) {
        List<User> admins = userRepository.findByRole(User.Role.ADMIN);
        
        String title = "New Leave Request";
        String message = String.format("%s %s has requested %s leave from %s to %s",
                leave.getEmployee().getFirstName(),
                leave.getEmployee().getLastName(),
                leave.getLeaveType().name(),
                leave.getStartDate(),
                leave.getEndDate());
        
        for (User admin : admins) {
            Notification notification = new Notification(admin, title, message, 
                    Notification.NotificationType.LEAVE_REQUEST, 
                    leave.getId(), "LEAVE");
            notificationRepository.save(notification);
        }
    }
    
    public void notifyEmployeeAboutLeaveApproval(Leave leave) {
        String title = "Leave Request Approved";
        String message = String.format("Your %s leave request from %s to %s has been approved",
                leave.getLeaveType().name(),
                leave.getStartDate(),
                leave.getEndDate());
        
        Notification notification = new Notification(leave.getEmployee(), title, message,
                Notification.NotificationType.LEAVE_APPROVED,
                leave.getId(), "LEAVE");
        notificationRepository.save(notification);
    }
    
    public void notifyEmployeeAboutLeaveRejection(Leave leave) {
        String title = "Leave Request Rejected";
        String message = String.format("Your %s leave request from %s to %s has been rejected. Reason: %s",
                leave.getLeaveType().name(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getRejectionReason());
        
        Notification notification = new Notification(leave.getEmployee(), title, message,
                Notification.NotificationType.LEAVE_REJECTED,
                leave.getId(), "LEAVE");
        notificationRepository.save(notification);
    }
    
    public void notifyAdminsAboutResignation(Resignation resignation) {
        List<User> admins = userRepository.findByRole(User.Role.ADMIN);
        
        String title = "New Resignation Request";
        String message = String.format("%s %s has submitted a resignation request with last working date: %s",
                resignation.getEmployee().getFirstName(),
                resignation.getEmployee().getLastName(),
                resignation.getLastWorkingDate());
        
        for (User admin : admins) {
            Notification notification = new Notification(admin, title, message,
                    Notification.NotificationType.RESIGNATION_REQUEST,
                    resignation.getId(), "RESIGNATION");
            notificationRepository.save(notification);
        }
    }
    
    public void notifyEmployeeAboutProjectAssignment(Project project, User employee) {
        String title = "Project Assignment";
        String message = String.format("You have been assigned to project: %s", project.getName());
        
        Notification notification = new Notification(employee, title, message,
                Notification.NotificationType.PROJECT_ASSIGNMENT,
                project.getId(), "PROJECT");
        notificationRepository.save(notification);
    }
} 