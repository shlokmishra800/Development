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
@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    private String assignmentId;
    private String studentId;
    @Builder.Default
    private LocalDateTime submissionDate = LocalDateTime.now();
    private String contentUrl;
    private String submissionText;
    private Double marksObtained;
    private String feedback;
    private String status; // SUBMITTED, GRADED, LATE
}
