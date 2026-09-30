package com.t2t.controller;

import com.t2t.model.Complaint;
import com.t2t.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getComplaintsByUser(@PathVariable String userId) {
        return complaintRepository.findByCitizenId(userId);
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setCreatedAt(LocalDateTime.now());
        if (complaint.getStatus() == null) {
            complaint.setStatus("SUBMITTED");
        }
        if (complaint.getSeverity() == null) {
            complaint.setSeverity("MEDIUM");
        }
        return complaintRepository.save(complaint);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Complaint> optional = complaintRepository.findById(id);
        if (optional.isPresent()) {
            Complaint complaint = optional.get();
            String newStatus = body.get("status");
            complaint.setStatus(newStatus);
            if ("RESOLVED".equalsIgnoreCase(newStatus)) {
                complaint.setResolvedAt(LocalDateTime.now());
            }
            if (body.containsKey("collectorNotes")) {
                complaint.setCollectorNotes(body.get("collectorNotes"));
            }
            if (body.containsKey("resolutionImageUrl")) {
                complaint.setResolutionImageUrl(body.get("resolutionImageUrl"));
            }
            return ResponseEntity.ok(complaintRepository.save(complaint));
        }
        return ResponseEntity.notFound().build();
    }
}
