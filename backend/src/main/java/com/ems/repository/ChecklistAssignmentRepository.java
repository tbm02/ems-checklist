package com.ems.repository;

import com.ems.entity.ChecklistAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChecklistAssignmentRepository extends JpaRepository<ChecklistAssignment, Long> {
    List<ChecklistAssignment> findAll();
    List<ChecklistAssignment> findByAssignedToId(Long userId);


}
