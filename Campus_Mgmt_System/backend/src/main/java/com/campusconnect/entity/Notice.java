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
@Document(collection = "notices")
public class Notice {

    @Id
    private String id;
    private String title;
    private String content;
    private String category; // ACADEMIC, EXAM, EVENT, HOLIDAY, GENERAL
    private String targetAudience; // ALL, STUDENTS, TEACHERS, DEPARTMENT
    private String targetId; // Department ID if targetAudience is DEPARTMENT
    private String createdBy;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
