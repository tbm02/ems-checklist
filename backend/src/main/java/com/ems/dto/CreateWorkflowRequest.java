package com.ems.dto;

import java.util.List;

public class CreateWorkflowRequest {
    private String name;
    private String description;
    private String priority; // HIGH, MEDIUM, LOW
    private List<StepDTO> steps;

    // Getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public List<StepDTO> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDTO> steps) {
        this.steps = steps;
    }

    public static class StepDTO {
        private String stepName;
        private String stepDescription;
        private Integer stepOrder;
        private String roleResponsible;

        // Getters and setters

        public String getStepName() {
            return stepName;
        }

        public void setStepName(String stepName) {
            this.stepName = stepName;
        }

        public String getStepDescription() {
            return stepDescription;
        }

        public void setStepDescription(String stepDescription) {
            this.stepDescription = stepDescription;
        }

        public Integer getStepOrder() {
            return stepOrder;
        }

        public void setStepOrder(Integer stepOrder) {
            this.stepOrder = stepOrder;
        }

        public String getRoleResponsible() {
            return roleResponsible;
        }

        public void setRoleResponsible(String roleResponsible) {
            this.roleResponsible = roleResponsible;
        }
    }
}
