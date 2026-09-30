package com.t2t.repository;

import com.t2t.model.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByCitizenId(String citizenId);
    List<Complaint> findByStatus(String status);
    List<Complaint> findBySeverity(String severity);
}
