package com.campusconnect.repository;

import com.campusconnect.entity.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssignmentRepository extends MongoRepository<Assignment, String> {
    List<Assignment> findBySubjectId(String subjectId);
    List<Assignment> findByTeacherId(String teacherId);
    List<Assignment> findByCourseIdAndSemester(String courseId, int semester);
}
