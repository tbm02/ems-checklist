package com.ems.repository;

import com.ems.entity.Resignation;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResignationRepository extends JpaRepository<Resignation, Long> {
    
    Optional<Resignation> findByEmployee(User employee);
    
    List<Resignation> findByStatus(Resignation.ResignationStatus status);
    
    List<Resignation> findByStatusOrderByCreatedAtDesc(Resignation.ResignationStatus status);
    
    List<Resignation> findByReviewedBy(User reviewedBy);
    
    @Query("SELECT r FROM Resignation r WHERE r.employee = :employee AND r.status = :status")
    Optional<Resignation> findByEmployeeAndStatus(@Param("employee") User employee, @Param("status") Resignation.ResignationStatus status);
    
    @Query("SELECT COUNT(r) FROM Resignation r WHERE r.status = 'PENDING'")
    long countPendingResignations();
    
    @Query("SELECT r FROM Resignation r WHERE r.lastWorkingDate >= :startDate AND r.lastWorkingDate <= :endDate")
    List<Resignation> findByLastWorkingDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT r FROM Resignation r WHERE r.lastWorkingDate <= :date AND r.status = 'APPROVED'")
    List<Resignation> findApprovedResignationsBeforeDate(@Param("date") LocalDate date);
} 