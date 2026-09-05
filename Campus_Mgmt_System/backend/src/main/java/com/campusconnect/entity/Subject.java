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
@Document(collection = "subjects")
public class Subject {

    @Id
    private String id;
    private String code;
    private String name;
    private String courseId;
    private String departmentId;
    private int semester;
    private String teacherId;
    private int credits;
}
