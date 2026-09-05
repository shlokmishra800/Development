package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "events")
public class Event {

    @Id
    private String id;
    private String title;
    private String description;
    private String location;
    private LocalDateTime eventDate;
    private String organizer;
    private String category;
    private String bannerUrl;
    @Builder.Default
    private List<String> registeredUserIds = new ArrayList<>();
}
