package com.campusconnect.repository;

import com.campusconnect.entity.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends MongoRepository<Teacher, String> {
    Optional<Teacher> findByUserId(String userId);
    Optional<Teacher> findByEmployeeId(String employeeId);
    List<Teacher> findByDepartmentId(String departmentId);
}
