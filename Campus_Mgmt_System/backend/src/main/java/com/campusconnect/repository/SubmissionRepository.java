package com.campusconnect.repository;

import com.campusconnect.entity.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    List<Submission> findByAssignmentId(String assignmentId);
    List<Submission> findByStudentId(String studentId);
    Optional<Submission> findByAssignmentIdAndStudentId(String assignmentId, String studentId);
}
