package com.campusconnect.repository;

import com.campusconnect.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByUserId(String userId);
    Optional<Student> findByRollNumber(String rollNumber);
    List<Student> findByDepartmentId(String departmentId);
    List<Student> findByCourseId(String courseId);
    List<Student> findByCourseIdAndSemester(String courseId, int semester);
}
