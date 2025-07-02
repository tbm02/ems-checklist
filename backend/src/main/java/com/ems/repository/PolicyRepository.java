package com.ems.repository;

import com.ems.entity.Policy;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    
    List<Policy> findByActive(boolean active);
    
    List<Policy> findByActiveOrderByCreatedAtDesc(boolean active);
    
    List<Policy> findByCreatedBy(User createdBy);
    
    @Query("SELECT p FROM Policy p WHERE p.active = true AND p.effectiveDate <= :currentDate ORDER BY p.effectiveDate DESC")
    List<Policy> findActivePoliciesEffectiveByDate(@Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT p FROM Policy p WHERE p.title LIKE %:title% AND p.active = true")
    List<Policy> findByTitleContainingAndActive(@Param("title") String title);
    
    @Query("SELECT p FROM Policy p WHERE p.effectiveDate >= :startDate AND p.effectiveDate <= :endDate")
    List<Policy> findByEffectiveDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
} 