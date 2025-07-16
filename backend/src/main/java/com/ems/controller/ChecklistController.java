package com.ems.controller;

import com.ems.dto.AssignWorkflowRequest;
import com.ems.dto.CreateWorkflowRequest;
import com.ems.entity.ChecklistAssignment;
import com.ems.entity.ChecklistTemplate;
import com.ems.entity.User;
import com.ems.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/workflows")
public class ChecklistController {

    @Autowired
    private ChecklistService checklistService;

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


}
