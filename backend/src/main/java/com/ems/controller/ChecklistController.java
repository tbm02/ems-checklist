package com.ems.controller;

import com.ems.dto.AssignWorkflowRequest;
import com.ems.dto.ChecklistTemplateDTO;
import com.ems.dto.CreateWorkflowRequest;
import com.ems.entity.ChecklistAssignment;
import com.ems.entity.ChecklistTemplate;
import com.ems.entity.User;
import com.ems.repository.ChecklistTemplateRepository;
import com.ems.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/workflows")
public class ChecklistController {

    @Autowired
    private ChecklistService checklistService;
    @Autowired
    private ChecklistTemplateRepository checklistTemplateRepository;


    @PostMapping
    public ResponseEntity<?> createWorkflow(@RequestBody CreateWorkflowRequest request,
                                            @AuthenticationPrincipal User currentUser) {
        ChecklistTemplate template = checklistService.createWorkflow(request, currentUser.getId());
        return ResponseEntity.ok(template);
    }

    @PostMapping("/assign")
    public ResponseEntity<?> assignWorkflow(@RequestBody AssignWorkflowRequest request) {
        ChecklistAssignment assignment = checklistService.assignWorkflow(request);
        return ResponseEntity.ok(assignment);
    }

    @GetMapping
    public ResponseEntity<List<ChecklistTemplateDTO>> getAllTemplates() {
        List<ChecklistTemplate> templates = checklistTemplateRepository.findAll();
        List<ChecklistTemplateDTO> result = templates.stream()
                .map(ChecklistTemplateDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ChecklistTemplateDTO> getTemplateById(@PathVariable Long id) {
        ChecklistTemplate template = checklistService.getTemplateById(id);
        ChecklistTemplateDTO response = new ChecklistTemplateDTO(template);
        return ResponseEntity.ok(response);
}




}