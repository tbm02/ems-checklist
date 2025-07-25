package com.ems.dto;

import java.time.LocalDate;
import java.util.List;

public class UserWorkflowDetailsDTO {
    private Long assignmentId;
    private String workflowName;
    private LocalDate assignedDate;
    private String priority;

    private List<UserWorkflowStepDTO> steps;

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getWorkflowName() {
        return workflowName;
    }

    public void setWorkflowName(String workflowName) {
        this.workflowName = workflowName;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }

    public List<UserWorkflowStepDTO> getSteps() {
        return steps;
    }

    public void setSteps(List<UserWorkflowStepDTO> steps) {
        this.steps = steps;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
