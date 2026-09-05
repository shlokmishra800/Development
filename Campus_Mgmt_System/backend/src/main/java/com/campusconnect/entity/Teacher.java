package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "teachers")
public class Teacher {

    @Id
    private String id;
    private String userId;
    private String employeeId;
    private String departmentId;
    private String designation;
    private String qualification;
    private String specialization;
    private List<String> assignedSubjectIds;
}
