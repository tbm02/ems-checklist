package com.ems.repository;

import com.ems.entity.ChecklistStepStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecklistStepStatusRepository extends JpaRepository<ChecklistStepStatus, Long> {
    List<ChecklistStepStatus> findByAssignedToId(Long userId);

}
