package com.ems.repository;

import com.ems.entity.Leave;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    
    List<Leave> findByEmployee(User employee);
    
    List<Leave> findByEmployeeOrderByCreatedAtDesc(User employee);
    
    List<Leave> findByStatus(Leave.LeaveStatus status);
    
    List<Leave> findByStatusOrderByCreatedAtDesc(Leave.LeaveStatus status);
    
    @Query("SELECT l FROM Leave l WHERE l.employee = :employee AND l.status = :status")
    List<Leave> findByEmployeeAndStatus(@Param("employee") User employee, @Param("status") Leave.LeaveStatus status);
    
    @Query("SELECT l FROM Leave l WHERE l.startDate >= :startDate AND l.endDate <= :endDate")
    List<Leave> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(l) FROM Leave l WHERE l.status = 'PENDING'")
    long countPendingLeaves();
    
    @Query("SELECT COUNT(l) FROM Leave l WHERE l.createdAt >= :startDate AND l.createdAt < :endDate")
    long countLeaveRequestsInMonth(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT l FROM Leave l WHERE l.employee = :employee AND l.status = 'APPROVED' AND l.endDate >= :currentDate")
    List<Leave> findUpcomingApprovedLeaves(@Param("employee") User employee, @Param("currentDate") LocalDate currentDate);
} 