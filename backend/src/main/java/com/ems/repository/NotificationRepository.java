package com.ems.repository;

import com.ems.entity.Notification;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByRecipient(User recipient);
    
    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);
    
    List<Notification> findByRecipientAndRead(User recipient, boolean read);
    
    List<Notification> findByRecipientAndReadOrderByCreatedAtDesc(User recipient, boolean read);
    
    List<Notification> findByType(Notification.NotificationType type);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.recipient = :recipient AND n.read = false")
    long countUnreadNotifications(@Param("recipient") User recipient);
    
    @Query("SELECT n FROM Notification n WHERE n.recipient = :recipient AND n.type = :type ORDER BY n.createdAt DESC")
    List<Notification> findByRecipientAndType(@Param("recipient") User recipient, @Param("type") Notification.NotificationType type);
    
    @Query("SELECT n FROM Notification n WHERE n.referenceId = :referenceId AND n.referenceType = :referenceType")
    List<Notification> findByReference(@Param("referenceId") Long referenceId, @Param("referenceType") String referenceType);
} 