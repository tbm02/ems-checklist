package com.ems.service;

import com.ems.dto.AssignWorkflowRequest;
import com.ems.dto.CreateWorkflowRequest;
import com.ems.entity.*;
import com.ems.repository.ChecklistTemplateRepository;
import com.ems.repository.ChecklistStepRepository;
import com.ems.repository.ChecklistAssignmentRepository;
import com.ems.repository.ChecklistStepStatusRepository;
import com.ems.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChecklistService {

    @Autowired
    private ChecklistTemplateRepository templateRepository;

    @Autowired
    private ChecklistStepRepository stepRepository;

    @Autowired
    private ChecklistAssignmentRepository checklistAssignmentRepository;

    @Autowired
    private ChecklistStepStatusRepository checklistStepStatusRepository;

    @Autowired
    private UserRepository userRepository;

    public ChecklistTemplate createWorkflow(CreateWorkflowRequest request, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChecklistTemplate template = new ChecklistTemplate();
        template.setName(request.getName());
        template.setDescription(request.getDescription());
        template.setPriority(ChecklistTemplate.Priority.valueOf(request.getPriority()));
        template.setCreatedBy(creator);

        ChecklistTemplate savedTemplate = templateRepository.save(template);

        List<ChecklistStep> steps = request.getSteps().stream().map(dto -> {
            ChecklistStep step = new ChecklistStep();
            step.setTemplate(savedTemplate);
            step.setStepName(dto.getStepName());
            step.setStepDescription(dto.getStepDescription());
            step.setStepOrder(dto.getStepOrder());
            step.setRoleResponsible(dto.getRoleResponsible());
            return step;
        }).toList();

        stepRepository.saveAll(steps);

        return savedTemplate;
    }

    public ChecklistAssignment assignWorkflow(AssignWorkflowRequest request) {
        ChecklistTemplate template = templateRepository.findById(request.getTemplateId())
                .orElseThrow(() -> new RuntimeException("Template not found"));

        User assignedUser = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChecklistAssignment assignment = new ChecklistAssignment();
        assignment.setTemplate(template);
        assignment.setAssignedTo(assignedUser);
        assignment.setAssignedAt(LocalDateTime.now());
        assignment.setStatus("IN_PROGRESS");

        checklistAssignmentRepository.save(assignment);

        for (AssignWorkflowRequest.StepAssignment stepRequest : request.getStepAssignments()) {
            ChecklistStep step = stepRepository.findById(stepRequest.getStepId())
                    .orElseThrow(() -> new RuntimeException("Step not found"));

            User stepUser = userRepository.findById(stepRequest.getAssignedTo())
                    .orElseThrow(() -> new RuntimeException("Step user not found"));

            ChecklistStepStatus stepStatus = new ChecklistStepStatus();
            stepStatus.setAssignment(assignment);
            stepStatus.setStep(step);
            stepStatus.setAssignedTo(stepUser);
            stepStatus.setStatus("PENDING");

            checklistStepStatusRepository.save(stepStatus);
        }

        return assignment;
    }

    @Transactional

    public List<ChecklistTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }

    public ChecklistTemplate getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found with id " + id));
    }

}