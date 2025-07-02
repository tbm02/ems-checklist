package com.ems.service;

import com.ems.entity.Announcement;
import com.ems.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {
    
    @Autowired
    private AnnouncementRepository announcementRepository;
    
    public List<Announcement> getActiveAnnouncements() {
        return announcementRepository.findActiveAnnouncementsOrderByPriorityAndDate();
    }
    
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
    
    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }
    
    public Announcement updateAnnouncement(Long announcementId, Announcement announcementUpdate) {
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        
        // Update fields
        if (announcementUpdate.getTitle() != null) {
            announcement.setTitle(announcementUpdate.getTitle());
        }
        if (announcementUpdate.getContent() != null) {
            announcement.setContent(announcementUpdate.getContent());
        }
        if (announcementUpdate.getPriority() != null) {
            announcement.setPriority(announcementUpdate.getPriority());
        }
        
        return announcementRepository.save(announcement);
    }
    
    public void deleteAnnouncement(Long announcementId) {
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        
        announcement.setActive(false);
        announcementRepository.save(announcement);
    }
    
    public List<Announcement> getHighPriorityAnnouncements() {
        return announcementRepository.findHighPriorityActiveAnnouncements();
    }
} 