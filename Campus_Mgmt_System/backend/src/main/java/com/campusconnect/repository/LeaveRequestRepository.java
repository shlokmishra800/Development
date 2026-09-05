package com.campusconnect.repository;

import com.campusconnect.entity.LeaveRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {
    List<LeaveRequest> findByStudentId(String studentId);
    List<LeaveRequest> findByStatus(String status);
}
