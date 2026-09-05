package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "attendance")
public class Attendance {

    @Id
    private String id;
    private String studentId;
    private String subjectId;
    private LocalDate date;
    private String status; // PRESENT, ABSENT, LATE
    private String remarks;
}
