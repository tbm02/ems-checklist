package com.ems.service;

import com.ems.entity.Project;
import com.ems.entity.User;
import com.ems.repository.ProjectRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public List<Project> getEmployeeProjects(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        return projectRepository.findProjectsByUserInvolvement(employee);
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public List<Project> getActiveProjects() {
        return projectRepository.findByStatus(Project.ProjectStatus.ACTIVE);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long projectId, Project projectUpdate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        // Update fields
        if (projectUpdate.getName() != null) {
            project.setName(projectUpdate.getName());
        }
        if (projectUpdate.getDescription() != null) {
            project.setDescription(projectUpdate.getDescription());
        }
        if (projectUpdate.getStartDate() != null) {
            project.setStartDate(projectUpdate.getStartDate());
        }
        if (projectUpdate.getEndDate() != null) {
            project.setEndDate(projectUpdate.getEndDate());
        }
        if (projectUpdate.getProjectLead() != null) {
            project.setProjectLead(projectUpdate.getProjectLead());
        }
        if (projectUpdate.getStatus() != null) {
            project.setStatus(projectUpdate.getStatus());
        }
        
        return projectRepository.save(project);
    }
    
    public Project assignMemberToProject(Long projectId, Long memberId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User member = userRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        project.getMembers().add(member);
        Project savedProject = projectRepository.save(project);
        
        // Notify employee about project assignment
        notificationService.notifyEmployeeAboutProjectAssignment(savedProject, member);
        
        return savedProject;
    }
    
    public long getTotalActiveProjectCount() {
        return projectRepository.countActiveProjects();
    }
} 