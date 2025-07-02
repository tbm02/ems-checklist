package com.ems.service;

import com.ems.entity.Resignation;
import com.ems.entity.User;
import com.ems.repository.ResignationRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResignationService {
    
    @Autowired
    private ResignationRepository resignationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public Resignation submitResignation(Resignation resignation, Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        resignation.setEmployee(employee);
        resignation.setStatus(Resignation.ResignationStatus.PENDING);
        
        Resignation savedResignation = resignationRepository.save(resignation);
        
        // Notify admins about resignation
        notificationService.notifyAdminsAboutResignation(savedResignation);
        
        return savedResignation;
    }
    
    public List<Resignation> getAllResignations() {
        return resignationRepository.findAll();
    }
    
    public List<Resignation> getPendingResignations() {
        return resignationRepository.findByStatusOrderByCreatedAtDesc(Resignation.ResignationStatus.PENDING);
    }
    
    public Resignation approveResignation(Long resignationId, Long adminId, String comments) {
        Resignation resignation = resignationRepository.findById(resignationId)
                .orElseThrow(() -> new RuntimeException("Resignation not found"));
        
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        resignation.setStatus(Resignation.ResignationStatus.APPROVED);
        resignation.setReviewedBy(admin);
        resignation.setReviewedAt(LocalDateTime.now());
        resignation.setAdminComments(comments);
        
        return resignationRepository.save(resignation);
    }
    
    public Resignation rejectResignation(Long resignationId, Long adminId, String comments) {
        Resignation resignation = resignationRepository.findById(resignationId)
                .orElseThrow(() -> new RuntimeException("Resignation not found"));
        
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        resignation.setStatus(Resignation.ResignationStatus.REJECTED);
        resignation.setReviewedBy(admin);
        resignation.setReviewedAt(LocalDateTime.now());
        resignation.setAdminComments(comments);
        
        return resignationRepository.save(resignation);
    }
} 