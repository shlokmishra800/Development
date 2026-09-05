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
@Document(collection = "emergency_reports")
public class EmergencyReport {

    @Id
    private String id;
    private String reporterId;
    private String reporterName;
    private String reportType; // MEDICAL, SECURITY, INFRASTRUCTURE, OTHER
    private String location;
    private String description;
    private String priority; // HIGH, CRITICAL
    private String status; // OPEN, INVESTIGATING, RESOLVED
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
