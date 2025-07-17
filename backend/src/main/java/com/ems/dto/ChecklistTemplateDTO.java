package com.ems.dto;

import com.ems.entity.ChecklistTemplate;
import com.ems.entity.ChecklistStep;

import java.util.List;
import java.util.stream.Collectors;

public class ChecklistTemplateDTO {
    private Long id;
    private String name;
    private String description;
    private String priority;
    private String createdAt;
    private List<ChecklistStepDTO> steps;

    // No-args constructor
    public ChecklistTemplateDTO() {}

    // Constructor from entity
    public ChecklistTemplateDTO(ChecklistTemplate template) {
        this.id = template.getId();
        this.name = template.getName();
        this.description = template.getDescription();
        this.priority = template.getPriority().name();
        this.createdAt = template.getCreatedAt().toString();
        this.steps = template.getSteps().stream()
                .map(ChecklistStepDTO::new)
                .collect(Collectors.toList());
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getPriority() { return priority; }
    public String getCreatedAt() { return createdAt; }
    public List<ChecklistStepDTO> getSteps() { return steps;}
}