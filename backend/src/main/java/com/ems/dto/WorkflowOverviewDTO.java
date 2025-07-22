package com.ems.dto;

import java.util.*;
// WorkflowOverviewDTO.java
public class WorkflowOverviewDTO {
    private int total;
    private int completed;
    private int pending;
    private int overdue;
    private List<WorkflowStatusDTO> workflows;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public int getOverdue() {
        return overdue;
    }

    public void setOverdue(int overdue) {
        this.overdue = overdue;
    }

    public List<WorkflowStatusDTO> getWorkflows() {
        return workflows;
    }

    public void setWorkflows(List<WorkflowStatusDTO> workflows) {
        this.workflows = workflows;
    }
}

