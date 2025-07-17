package com.ems.dto;

import com.ems.entity.ChecklistStep;

public class ChecklistStepDTO {
    private Long id;
    private String stepName;
    private String stepDescription;
    private Integer stepOrder;
    private String roleResponsible;

    public ChecklistStepDTO() {}

    public ChecklistStepDTO(ChecklistStep step) {
        this.id = step.getId();
        this.stepName = step.getStepName();
        this.stepDescription = step.getStepDescription();
        this.stepOrder = step.getStepOrder();
        this.roleResponsible = step.getRoleResponsible();
    }

    public Long getId() { return id; }
    public String getStepName() { return stepName; }
    public String getStepDescription() { return stepDescription; }
    public Integer getStepOrder() { return stepOrder; }
    public String getRoleResponsible() { return roleResponsible;}
}