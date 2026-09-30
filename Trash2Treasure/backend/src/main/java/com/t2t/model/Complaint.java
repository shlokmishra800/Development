package com.t2t.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "complaints")
public class Complaint {
    @Id
    private String id;
    private String citizenId;
    private String citizenName;
    private String title;
    private String category; // GENERAL, RECYCLABLE, E_WASTE, HAZARD, PLASTIC, WET_WASTE
    private String description;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private String address;
    private String status; // SUBMITTED, ASSIGNED, IN_PROGRESS, RESOLVED
    private String severity; // LOW, MEDIUM, HIGH, EMERGENCY
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private String collectorId;
    private String collectorNotes;
    private String resolutionImageUrl;
}
