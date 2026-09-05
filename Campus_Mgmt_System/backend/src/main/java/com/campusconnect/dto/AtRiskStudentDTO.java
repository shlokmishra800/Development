package com.campusconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AtRiskStudentDTO {
    private String studentId;
    private String fullName;
    private String rollNumber;
    private double attendancePercentage;
    private int missingAssignmentsCount;
    private double averageMarks;
    private String riskLevel; // LOW, MEDIUM, HIGH
    private String reason;
}
