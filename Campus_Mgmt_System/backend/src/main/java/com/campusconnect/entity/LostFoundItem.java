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
@Document(collection = "lost_found")
public class LostFoundItem {

    @Id
    private String id;
    private String title;
    private String description;
    private String type; // LOST, FOUND
    private String location;
    private String contactInfo;
    private String imageUrl;
    private String reporterId;
    private String status; // OPEN, RESOLVED
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
