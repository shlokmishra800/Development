package com.campusconnect.repository;

import com.campusconnect.entity.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByCourseId(String courseId);
    List<Subject> findByCourseIdAndSemester(String courseId, int semester);
    List<Subject> findByTeacherId(String teacherId);
}
