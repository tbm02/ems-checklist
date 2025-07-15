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
    @JoinColumn(name = "assignment_id")
    private ChecklistAssignment assignment;

    @ManyToOne
    @JoinColumn(name = "step_id")
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

    // Getters and setters
}
