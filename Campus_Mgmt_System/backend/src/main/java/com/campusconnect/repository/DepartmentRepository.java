package com.campusconnect.repository;

import com.campusconnect.entity.*;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends MongoRepository<Department, String> {
    Optional<Department> findByCode(String code);
}

interface CourseRepositoryInterface extends MongoRepository<Course, String> {
    List<Course> findByDepartmentId(String departmentId);
}
