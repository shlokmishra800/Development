package com.campusconnect.repository;

import com.campusconnect.entity.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResultRepository extends MongoRepository<Result, String> {
    List<Result> findByStudentId(String studentId);
    List<Result> findByStudentIdAndSemester(String studentId, int semester);
    List<Result> findBySubjectId(String subjectId);
}
