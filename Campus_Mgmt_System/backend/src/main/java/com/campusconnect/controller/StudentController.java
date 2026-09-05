package com.campusconnect.controller;

import com.campusconnect.entity.*;
import com.campusconnect.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN')")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Student> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(studentService.getStudentProfileByUserId(userId));
    }

    @GetMapping("/dashboard/summary/{studentId}")
    public ResponseEntity<Map<String, Object>> getDashboardSummary(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.getStudentDashboardSummary(studentId));
    }

    @PostMapping("/assignments/{assignmentId}/submit")
    public ResponseEntity<Submission> submitAssignment(
            @PathVariable String assignmentId,
            @RequestParam String studentId,
            @RequestParam(required = false, defaultValue = "") String contentUrl,
            @RequestParam(required = false, defaultValue = "") String submissionText) {
        return ResponseEntity.ok(studentService.submitAssignment(assignmentId, studentId, contentUrl, submissionText));
    }

    @PostMapping("/leave-requests")
    public ResponseEntity<LeaveRequest> applyForLeave(@RequestBody LeaveRequest request) {
        return ResponseEntity.ok(studentService.applyForLeave(request));
    }

    @PostMapping("/events/{eventId}/register")
    public ResponseEntity<Event> registerForEvent(@PathVariable String eventId, @RequestParam String userId) {
        return ResponseEntity.ok(studentService.registerForEvent(eventId, userId));
    }
}
