package com.campusconnect.repository;

import com.campusconnect.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByDepartmentId(String departmentId);
}
