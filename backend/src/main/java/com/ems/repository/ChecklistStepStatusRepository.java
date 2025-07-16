package com.ems.repository;

import com.ems.entity.ChecklistStepStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistStepStatusRepository extends JpaRepository<ChecklistStepStatus, Long> {
}
