package com.campusconnect.controller;

import com.campusconnect.dto.AtRiskStudentDTO;
import com.campusconnect.entity.*;
import com.campusconnect.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/teacher")
@PreAuthorize("hasAnyAuthority('ROLE_TEACHER', 'ROLE_ADMIN')")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Teacher> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(teacherService.getTeacherProfileByUserId(userId));
    }

    @GetMapping("/subjects/{teacherId}")
    public ResponseEntity<List<Subject>> getTeacherSubjects(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getTeacherAssignedSubjects(teacherId));
    }

    @GetMapping("/schedule/{teacherId}")
    public ResponseEntity<List<ClassSchedule>> getTeacherSchedule(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getTeacherSchedule(teacherId));
    }

    @GetMapping("/at-risk-students/{teacherId}")
    public ResponseEntity<List<AtRiskStudentDTO>> getAtRiskStudents(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getAtRiskStudents(teacherId));
    }

    @PostMapping("/attendance/bulk")
    public ResponseEntity<Void> markBulkAttendance(@RequestBody List<Map<String, Object>> records) {
        teacherService.markBulkAttendance(records);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/assignments")
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        return ResponseEntity.ok(teacherService.createAssignment(assignment));
    }

    @GetMapping("/submissions/{assignmentId}")
    public ResponseEntity<List<Submission>> getSubmissions(@PathVariable String assignmentId) {
        return ResponseEntity.ok(teacherService.getSubmissionsForAssignment(assignmentId));
    }

    @PostMapping("/submissions/{submissionId}/grade")
    public ResponseEntity<Submission> gradeSubmission(
            @PathVariable String submissionId,
            @RequestParam double marks,
            @RequestParam(required = false, defaultValue = "") String feedback) {
        return ResponseEntity.ok(teacherService.gradeSubmission(submissionId, marks, feedback));
    }

    @PostMapping("/leave-requests/{requestId}/review")
    public ResponseEntity<LeaveRequest> reviewLeaveRequest(
            @PathVariable String requestId,
            @RequestParam String status,
            @RequestParam(required = false, defaultValue = "") String remarks) {
        return ResponseEntity.ok(teacherService.reviewLeaveRequest(requestId, status, remarks));
    }
}
