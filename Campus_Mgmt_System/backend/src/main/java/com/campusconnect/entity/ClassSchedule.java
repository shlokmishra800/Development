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
@Document(collection = "class_schedules")
public class ClassSchedule {

    @Id
    private String id;
    private String courseId;
    private String subjectId;
    private String teacherId;
    private int semester;
    private String dayOfWeek; // MONDAY, TUESDAY, etc.
    private String startTime; // "09:00"
    private String endTime;   // "10:00"
    private String roomNumber;
}
