package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String userId;
    private String title;
    private String message;
    @Builder.Default
    private boolean read = false;
    private String type; // ASSIGNMENT, NOTICE, EXAM, LEAVE, SYSTEM
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
