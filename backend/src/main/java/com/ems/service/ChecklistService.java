package com.ems.service;

import com.ems.dto.*;
import com.ems.entity.*;
import com.ems.enums.StepStatus;
import com.ems.repository.ChecklistTemplateRepository;
import com.ems.repository.ChecklistStepRepository;
import com.ems.repository.ChecklistAssignmentRepository;
import com.ems.repository.ChecklistStepStatusRepository;
import com.ems.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


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
            stepStatus.setStatus(StepStatus.PENDING);
            stepStatus.setDueDate(stepRequest.getDueDate());

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

    public WorkflowReportDTO getWorkflowReport(Long assignmentId) {
        ChecklistAssignment assignment = checklistAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        WorkflowReportDTO report = new WorkflowReportDTO();
        report.setAssignmentId(assignment.getId());
        report.setWorkflowName(assignment.getTemplate().getName());
        report.setPriority(assignment.getTemplate().getPriority().name());
        report.setAssignedTo(assignment.getAssignedTo().getFullName());
        report.setAssignedDate(assignment.getAssignedAt().toLocalDate());

        List<WorkflowReportDTO.StepReportDTO> steps = assignment.getStepStatuses().stream().map(stepStatus -> {
            WorkflowReportDTO.StepReportDTO stepDTO = new WorkflowReportDTO.StepReportDTO();
            stepDTO.setStepName(stepStatus.getStep().getStepName());
            stepDTO.setStatus(stepStatus.getStatus().name());
            stepDTO.setAssignedTo(stepStatus.getAssignedTo().getFullName());
            stepDTO.setDueDate(stepStatus.getDueDate());
            stepDTO.setCompletedAt(stepStatus.getCompletedAt());
            stepDTO.setRemarks(stepStatus.getRemarks());
            return stepDTO;
        }).toList();

        report.setSteps(steps);

        return report;
    }

    public List<EmployeeWorkflowDTO> getWorkflowsForUser(Long userId) {
        List<ChecklistStepStatus> stepStatuses = checklistStepStatusRepository.findByAssignedToId(userId);

        Set<ChecklistAssignment> assignments = stepStatuses.stream()
                .map(ChecklistStepStatus::getAssignment)
                .collect(Collectors.toSet());

        return assignments.stream().map(assignment -> {
            EmployeeWorkflowDTO dto = new EmployeeWorkflowDTO();
            dto.setAssignmentId(assignment.getId());
            dto.setWorkflowName(assignment.getTemplate().getName());
            dto.setPriority(assignment.getTemplate().getPriority().name());
            dto.setAssignedDate(assignment.getAssignedAt().toLocalDate());

            List<EmployeeWorkflowDTO.StepDTO> steps = assignment.getStepStatuses().stream()
                    .filter(status -> status.getAssignedTo().getId().equals(userId))
                    .map(stepStatus -> {
                        EmployeeWorkflowDTO.StepDTO stepDTO = new EmployeeWorkflowDTO.StepDTO();
                        stepDTO.setStepId(stepStatus.getStep().getId());
                        stepDTO.setStepName(stepStatus.getStep().getStepName());
                        stepDTO.setStatus(stepStatus.getStatus().name());
                        stepDTO.setDueDate(stepStatus.getDueDate());
                        return stepDTO;
                    }).toList();

            dto.setSteps(steps);
            return dto;
        }).toList();
    }


    public UserWorkflowDetailsDTO getUserWorkflowDetails(Long assignmentId, Long userId) {
        ChecklistAssignment assignment = checklistAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        List<ChecklistStepStatus> userSteps = assignment.getStepStatuses().stream()
                .filter(step -> step.getAssignedTo().getId().equals(userId))
                .toList();

        List<UserWorkflowStepDTO> stepDTOs = userSteps.stream().map(step -> {
            UserWorkflowStepDTO dto = new UserWorkflowStepDTO();
            dto.setStepId(step.getId());
            dto.setStepName(step.getStep().getStepName());
            dto.setStatus(step.getStatus().name());
            dto.setDueDate(step.getDueDate());
            dto.setRemarks(step.getRemarks());
            dto.setCompletedAt(step.getCompletedAt());
            dto.setAttachmentPath(step.getAttachmentPath());
            return dto;
        }).toList();

        UserWorkflowDetailsDTO response = new UserWorkflowDetailsDTO();
        response.setAssignmentId(assignment.getId());
        response.setWorkflowName(assignment.getTemplate().getName());
        response.setAssignedDate(assignment.getAssignedAt().toLocalDate());
        response.setPriority(assignment.getTemplate().getPriority().name());

        response.setSteps(stepDTOs);

        return response;
    }

    @Transactional
    public void updateWorkflow(Long assignmentId, Long userId,
                               Map<String, String> stepUpdates,
                               Map<String, MultipartFile> files) {

        ChecklistAssignment assignment = checklistAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        Set<Long> stepStatusIds = stepUpdates.keySet().stream()
                .map(key -> key.replaceAll("\\D+", ""))  // Extract digits only
                .map(Long::parseLong)
                .collect(Collectors.toSet());

        for (Long stepStatusId : stepStatusIds) {
            ChecklistStepStatus stepStatus = checklistStepStatusRepository.findById(stepStatusId)
                    .orElseThrow(() -> new RuntimeException("StepStatus not found"));

            if (!stepStatus.getAssignedTo().getId().equals(userId)) {
                throw new RuntimeException("You are not authorized to update this step");
            }

            // --- Remarks ---
            String remarksKey = "stepUpdates[" + stepStatusId + "][remarks]";
            String remarks = stepUpdates.get(remarksKey);
            if (remarks != null) {
                stepStatus.setRemarks(remarks);
            }

            // --- Status ---
            String statusKey = "stepUpdates[" + stepStatusId + "][status]";
            String status = stepUpdates.get(statusKey);
            if ("COMPLETED".equals(status)) {
                stepStatus.setStatus(StepStatus.COMPLETED);
                stepStatus.setCompletedAt(LocalDateTime.now());
            }

            // --- File ---
            String fileKey = "stepUpdates[" + stepStatusId + "][file]";
            MultipartFile file = files.get(fileKey);
            if (file != null && !file.isEmpty()) {
                try {
                    String folderPath = new File("uploads/attachments").getAbsolutePath();
                    Files.createDirectories(Paths.get(folderPath));

                    String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = Paths.get(folderPath, filename);

                    file.transferTo(filePath.toFile());
                    stepStatus.setAttachmentPath(filePath.toString());

                } catch (Exception e) {
                    throw new RuntimeException("Failed to save attachment", e);
                }
            }

            checklistStepStatusRepository.save(stepStatus);
        }
    }


}