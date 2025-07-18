package com.ems.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "checklist_step_status")
public class ChecklistStepStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private ChecklistAssignment assignment;

    @ManyToOne
    @JoinColumn(name = "step_id", nullable = false)
    private ChecklistStep step;

    private String status = "PENDING";

    private String remarks;

    @Column(name = "attachment_path")
    private String attachmentPath;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "completed_by")
    private User completedBy;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;


    public Long getId() {
        return id;
    }

    public ChecklistAssignment getAssignment() {
        return assignment;
    }

    public void setAssignment(ChecklistAssignment assignment) {
        this.assignment = assignment;
    }

    public ChecklistStep getStep() {
        return step;
    }

    public void setStep(ChecklistStep step) {
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getAttachmentPath() {
        return attachmentPath;
    }

    public void setAttachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public User getCompletedBy() {
        return completedBy;
    }

    public void setCompletedBy(User completedBy) {
        this.completedBy = completedBy;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
