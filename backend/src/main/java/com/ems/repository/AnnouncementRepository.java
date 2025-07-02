package com.ems.repository;

import com.ems.entity.Announcement;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    
    List<Announcement> findByActive(boolean active);
    
    List<Announcement> findByActiveOrderByCreatedAtDesc(boolean active);
    
    List<Announcement> findByCreatedBy(User createdBy);
    
    List<Announcement> findByPriority(Announcement.Priority priority);
    
    @Query("SELECT a FROM Announcement a WHERE a.active = true ORDER BY a.priority DESC, a.createdAt DESC")
    List<Announcement> findActiveAnnouncementsOrderByPriorityAndDate();
    
    @Query("SELECT a FROM Announcement a WHERE a.title LIKE %:title% AND a.active = true")
    List<Announcement> findByTitleContainingAndActive(@Param("title") String title);
    
    @Query("SELECT a FROM Announcement a WHERE a.active = true AND a.priority IN ('HIGH', 'URGENT') ORDER BY a.createdAt DESC")
    List<Announcement> findHighPriorityActiveAnnouncements();
} 