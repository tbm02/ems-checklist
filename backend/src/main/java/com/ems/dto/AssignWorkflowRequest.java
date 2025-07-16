package com.ems.dto;

import java.util.List;

public class AssignWorkflowRequest {
    private Long templateId;
    private Long assignedToUserId;
    private List<StepAssignment> stepAssignments;

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public Long getAssignedToUserId() {
        return assignedToUserId;
    }

    public void setAssignedToUserId(Long assignedToUserId) {
        this.assignedToUserId = assignedToUserId;
    }

    public List<StepAssignment> getStepAssignments() {
        return stepAssignments;
    }

    public void setStepAssignments(List<StepAssignment> stepAssignments) {
        this.stepAssignments = stepAssignments;
    }

    public static class StepAssignment {
        private Long stepId;
        private Long assignedTo;

        public Long getStepId() {
            return stepId;
        }

        public void setStepId(Long stepId) {
            this.stepId = stepId;
        }

        public Long getAssignedTo() {
            return assignedTo;
        }

        public void setAssignedTo(Long assignedTo) {
            this.assignedTo = assignedTo;
        }
    }
}
