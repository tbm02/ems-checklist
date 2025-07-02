package com.ems.service;

import com.ems.dto.LeaveRequest;
import com.ems.entity.Leave;
import com.ems.entity.User;
import com.ems.repository.LeaveRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveService {
    
    @Autowired
    private LeaveRepository leaveRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public Leave applyLeave(LeaveRequest leaveRequest, Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        // TODO: Add business logic for leave balance validation
        
        Leave leave = new Leave();
        leave.setEmployee(employee);
        leave.setStartDate(leaveRequest.getStartDate());
        leave.setEndDate(leaveRequest.getEndDate());
        leave.setLeaveType(leaveRequest.getLeaveType());
        leave.setReason(leaveRequest.getReason());
        leave.setStatus(Leave.LeaveStatus.PENDING);
        
        Leave savedLeave = leaveRepository.save(leave);
        
        // Notify admins about new leave request
        notificationService.notifyAdminsAboutLeaveRequest(savedLeave);
        
        return savedLeave;
    }
    
    public List<Leave> getEmployeeLeaves(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        return leaveRepository.findByEmployeeOrderByCreatedAtDesc(employee);
    }
    
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }
    
    public List<Leave> getPendingLeaves() {
        return leaveRepository.findByStatusOrderByCreatedAtDesc(Leave.LeaveStatus.PENDING);
    }
    
    public Leave approveLeave(Long leaveId, Long adminId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        leave.setStatus(Leave.LeaveStatus.APPROVED);
        leave.setApprovedBy(admin);
        leave.setApprovedAt(LocalDateTime.now());
        
        Leave savedLeave = leaveRepository.save(leave);
        
        // Notify employee about approval
        notificationService.notifyEmployeeAboutLeaveApproval(savedLeave);
        
        return savedLeave;
    }
    
    public Leave rejectLeave(Long leaveId, Long adminId, String rejectionReason) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        leave.setStatus(Leave.LeaveStatus.REJECTED);
        leave.setApprovedBy(admin);
        leave.setApprovedAt(LocalDateTime.now());
        leave.setRejectionReason(rejectionReason);
        
        Leave savedLeave = leaveRepository.save(leave);
        
        // Notify employee about rejection
        notificationService.notifyEmployeeAboutLeaveRejection(savedLeave);
        
        return savedLeave;
    }
    
    public List<Leave> getUpcomingApprovedLeaves(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        return leaveRepository.findUpcomingApprovedLeaves(employee, LocalDate.now());
    }
    
    public long getLeaveRequestsCountThisMonth() {
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);
        
        return leaveRepository.countLeaveRequestsInMonth(startOfMonth, endOfMonth);
    }
} 