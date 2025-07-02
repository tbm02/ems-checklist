package com.ems.dto;

import com.ems.entity.Leave;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class LeaveRequest {
    
    @NotNull
    private LocalDate startDate;
    
    @NotNull
    private LocalDate endDate;
    
    @NotNull
    private Leave.LeaveType leaveType;
    
    private String reason;
    
    public LeaveRequest() {}
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public Leave.LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(Leave.LeaveType leaveType) { this.leaveType = leaveType; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
} 