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
@Document(collection = "assignments")
public class Assignment {

    @Id
    private String id;
    private String title;
    private String description;
    private String subjectId;
    private String teacherId;
    private String courseId;
    private int semester;
    private LocalDateTime dueDate;
    private double maxMarks;
    private String attachmentUrl;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
