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
@Document(collection = "feedbacks")
public class Feedback {
    @Id
    private String id;
    private String userName;
    private String userEmail;
    private String userRole;
    private Integer rating; // 1 to 5 Stars
    private String category; // BUG, SUGGESTION, PRAISE, GENERAL
    private String message;
    private LocalDateTime createdAt;
}
