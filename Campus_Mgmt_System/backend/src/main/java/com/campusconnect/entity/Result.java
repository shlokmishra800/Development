package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "results")
public class Result {

    @Id
    private String id;
    private String studentId;
    private String subjectId;
    private String examType; // MID_TERM, FINAL, ASSIGNMENT
    private double marksObtained;
    private double maxMarks;
    private String grade;
    private int semester;
}
