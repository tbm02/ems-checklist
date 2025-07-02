package com.ems.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;
    
    @NotBlank
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    private boolean read = false;
    
    @Column(name = "reference_id")
    private Long referenceId; // ID of related entity (leave, resignation, etc.)
    
    @Column(name = "reference_type")
    private String referenceType; // Type of related entity
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public Notification() {}
    
    public Notification(User recipient, String title, String message, NotificationType type) {
        this.recipient = recipient;
        this.title = title;
        this.message = message;
        this.type = type;
    }
    
    public Notification(User recipient, String title, String message, NotificationType type, Long referenceId, String referenceType) {
        this.recipient = recipient;
        this.title = title;
        this.message = message;
        this.type = type;
        this.referenceId = referenceId;
        this.referenceType = referenceType;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getRecipient() { return recipient; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    
    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
    
    public Long getReferenceId() { return referenceId; }
    public void setReferenceId(Long referenceId) { this.referenceId = referenceId; }
    
    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public enum NotificationType {
        LEAVE_REQUEST, LEAVE_APPROVED, LEAVE_REJECTED,
        RESIGNATION_REQUEST, RESIGNATION_APPROVED, RESIGNATION_REJECTED,
        PROJECT_ASSIGNMENT, POLICY_UPDATE, GENERAL
    }
} 