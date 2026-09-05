package com.campusconnect.repository;

import com.campusconnect.entity.EmergencyReport;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmergencyReportRepository extends MongoRepository<EmergencyReport, String> {
    List<EmergencyReport> findByStatusOrderByCreatedAtDesc(String status);
}
