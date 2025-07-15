package com.ems.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "checklist_steps")
public class ChecklistStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private ChecklistTemplate template;

    @Column(name = "step_name")
    private String stepName;

    @Column(name = "step_description")
    private String stepDescription;

    @Column(name = "step_order")
    private Integer stepOrder;

    @Column(name = "role_responsible")
    private String roleResponsible;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
}
