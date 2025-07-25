package com.ems.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public class WorkflowUpdateRequest {
    private Map<Long, StepUpdate> stepUpdates;

    public Map<Long, StepUpdate> getStepUpdates() {
        return stepUpdates;
    }

    public void setStepUpdates(Map<Long, StepUpdate> stepUpdates) {
        this.stepUpdates = stepUpdates;
    }

    public static class StepUpdate {
        private String remarks;
        private MultipartFile file;
        private String status;

        public String getRemarks() {
            return remarks;
        }

        public void setRemarks(String remarks) {
            this.remarks = remarks;
        }

        public MultipartFile getFile() {
            return file;
        }

        public void setFile(MultipartFile file) {
            this.file = file;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
