package com.ems.controller;

import com.ems.dto.EmployeeWorkflowDTO;
import com.ems.dto.UserWorkflowDetailsDTO;
import com.ems.dto.WorkflowUpdateRequest;
import com.ems.entity.User;
import com.ems.repository.UserRepository;
import com.ems.security.UserDetailsImp;
import com.ems.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/workflows")
public class UserWorkflowController {

    @Autowired
    private ChecklistService checklistService;
    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public ResponseEntity<List<EmployeeWorkflowDTO>> getUserWorkflows(@AuthenticationPrincipal User user) {
        List<EmployeeWorkflowDTO> workflows = checklistService.getWorkflowsForUser(user.getId());
        return ResponseEntity.ok(workflows);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<UserWorkflowDetailsDTO> getUserWorkflowDetails(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {

        User currectUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserWorkflowDetailsDTO details = checklistService.getUserWorkflowDetails(assignmentId, currectUser.getId());
        return ResponseEntity.ok(details);
    }

    @PostMapping("/{assignmentId}/update")
    public ResponseEntity<?> updateWorkflow(
            @PathVariable Long assignmentId,
            @AuthenticationPrincipal User user,
            @RequestParam Map<String, String> stepUpdates,
            @RequestParam(required = false) Map<String, MultipartFile> files) {

        checklistService.updateWorkflow(assignmentId, user.getId(), stepUpdates, files);
        return ResponseEntity.ok("Workflow updated successfully");
    }


}
