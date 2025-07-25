package com.ems.dto;

import java.time.LocalDate;
import java.util.List;

public class EmployeeWorkflowDTO {
    private Long assignmentId;
    private String workflowName;
    private String priority;
    private LocalDate assignedDate;
    private List<StepDTO> steps;

    public static class StepDTO {
        private Long stepId;
        private String stepName;
        private String status;
        private LocalDate dueDate;

        public Long getStepId() { return stepId; }
        public void setStepId(Long stepId) { this.stepId = stepId; }

        public String getStepName() { return stepName; }
        public void setStepName(String stepName) { this.stepName = stepName; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public LocalDate getDueDate() { return dueDate; }
        public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    }

    public Long getAssignmentId() { return assignmentId; }
    public void setAssignmentId(Long assignmentId) { this.assignmentId = assignmentId; }

    public String getWorkflowName() { return workflowName; }
    public void setWorkflowName(String workflowName) { this.workflowName = workflowName; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public LocalDate getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; }

    public List<StepDTO> getSteps() { return steps; }
    public void setSteps(List<StepDTO> steps) { this.steps = steps; }
}
