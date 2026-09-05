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
@Document(collection = "students")
public class Student {

    @Id
    private String id;
    private String userId;
    private String rollNumber;
    private String departmentId;
    private String courseId;
    private int semester;
    private String batch;
    private String guardianContact;
    private String address;
}
