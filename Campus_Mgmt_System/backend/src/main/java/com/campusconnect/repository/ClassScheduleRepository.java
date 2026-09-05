package com.campusconnect.repository;

import com.campusconnect.entity.ClassSchedule;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClassScheduleRepository extends MongoRepository<ClassSchedule, String> {
    List<ClassSchedule> findByCourseIdAndSemester(String courseId, int semester);
    List<ClassSchedule> findByTeacherId(String teacherId);
    List<ClassSchedule> findByTeacherIdAndDayOfWeek(String teacherId, String dayOfWeek);
    List<ClassSchedule> findByCourseIdAndSemesterAndDayOfWeek(String courseId, int semester, String dayOfWeek);
}
