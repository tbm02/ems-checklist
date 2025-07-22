package com.ems.service;

import com.ems.dto.WorkflowOverviewDTO;
import com.ems.dto.WorkflowStatusDTO;
import com.ems.entity.ChecklistAssignment;
import com.ems.entity.ChecklistStepStatus;
//import com.ems.model.ChecklistAssignment;
//import com.ems.model.ChecklistStepStatus;
//import com.ems.model.enums.StepStatus;
import com.ems.enums.StepStatus;
import com.ems.repository.ChecklistAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class WorkflowStatusService {

    @Autowired
    private ChecklistAssignmentRepository assignmentRepository;

    public WorkflowOverviewDTO getWorkflowOverview() {
        List<ChecklistAssignment> assignments = assignmentRepository.findAll();

        int completed = 0, pending = 0, overdue = 0;

        List<WorkflowStatusDTO> workflows = new ArrayList<>();
        for (ChecklistAssignment assignment : assignments) {
            List<ChecklistStepStatus> stepStatuses = assignment.getStepStatuses();
            int totalSteps = stepStatuses.size();
            int completedSteps = (int) stepStatuses.stream()
                    .filter(s -> s.getStatus() == StepStatus.COMPLETED)
                    .count();

            String status;
            if (completedSteps == totalSteps) {
                status = "completed";
                completed++;
            } else {
                LocalDate anyOverdue = stepStatuses.stream()
                        .filter(s -> s.getDueDate() != null && s.getDueDate().isBefore(LocalDate.now()))
                        .findAny()
                        .map(ChecklistStepStatus::getDueDate)
                        .orElse(null);
                if (anyOverdue != null) {
                    status = "overdue";
                    overdue++;
                } else {
                    status = "pending";
                    pending++;
                }
            }

            WorkflowStatusDTO dto = new WorkflowStatusDTO();
            dto.setId(assignment.getId());
            dto.setWorkflowName(assignment.getTemplate().getName());
            dto.setPriority(assignment.getTemplate().getPriority().name());
            dto.setCompletedSteps(completedSteps);
            dto.setTotalSteps(totalSteps);
            dto.setDueDate(
                    stepStatuses.stream()
                            .map(ChecklistStepStatus::getDueDate)
                            .filter(Objects::nonNull)
                            .max(LocalDate::compareTo)
                            .orElse(null)
            );
            dto.setStatus(status);
            workflows.add(dto);
        }

        WorkflowOverviewDTO overview = new WorkflowOverviewDTO();
        overview.setTotal(assignments.size());
        overview.setCompleted(completed);
        overview.setPending(pending);
        overview.setOverdue(overdue);
        overview.setWorkflows(workflows);

        return overview;
    }
}
