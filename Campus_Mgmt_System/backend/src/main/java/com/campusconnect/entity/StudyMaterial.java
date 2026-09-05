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
@Document(collection = "study_materials")
public class StudyMaterial {

    @Id
    private String id;
    private String title;
    private String subjectId;
    private String teacherId;
    private String fileUrl;
    private String fileType; // PDF, PPT, DOC, LINK
    private String description;
    @Builder.Default
    private LocalDateTime uploadedAt = LocalDateTime.now();
}
