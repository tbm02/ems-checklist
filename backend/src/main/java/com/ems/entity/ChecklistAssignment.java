package com.ems.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "checklist_assignments")
public class ChecklistAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private ChecklistTemplate template;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    private String status = "IN_PROGRESS";

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt = LocalDateTime.now();

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    // Getters and setters
}
