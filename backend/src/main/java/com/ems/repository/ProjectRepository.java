package com.ems.repository;

import com.ems.entity.Project;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByStatus(Project.ProjectStatus status);
    
    List<Project> findByStatusOrderByCreatedAtDesc(Project.ProjectStatus status);
    
    List<Project> findByProjectLead(User projectLead);
    
    List<Project> findByCreatedBy(User createdBy);
    
    @Query("SELECT p FROM Project p JOIN p.members m WHERE m = :user")
    List<Project> findByMembersContaining(@Param("user") User user);
    
    @Query("SELECT p FROM Project p WHERE p.projectLead = :user OR :user MEMBER OF p.members")
    List<Project> findProjectsByUserInvolvement(@Param("user") User user);
    
    @Query("SELECT COUNT(p) FROM Project p WHERE p.status = 'ACTIVE'")
    long countActiveProjects();
    
    @Query("SELECT p FROM Project p WHERE p.startDate >= :startDate AND p.endDate <= :endDate")
    List<Project> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT p FROM Project p WHERE p.name LIKE %:name% AND p.status = :status")
    List<Project> findByNameContainingAndStatus(@Param("name") String name, @Param("status") Project.ProjectStatus status);
} 