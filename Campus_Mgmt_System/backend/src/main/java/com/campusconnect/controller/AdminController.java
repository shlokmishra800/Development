package com.campusconnect.controller;

import com.campusconnect.dto.ScheduleConflictDTO;
import com.campusconnect.entity.*;
import com.campusconnect.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        return ResponseEntity.ok(adminService.getAdminDashboardStats());
    }

    // Student Management
    @GetMapping("/students")
    public ResponseEntity<List<Map<String, Object>>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @PostMapping("/students")
    public ResponseEntity<Student> addStudent(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(adminService.addStudent(payload));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String id) {
        adminService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }

    // Teacher Management
    @GetMapping("/teachers")
    public ResponseEntity<List<Map<String, Object>>> getAllTeachers() {
        return ResponseEntity.ok(adminService.getAllTeachers());
    }

    @PostMapping("/teachers")
    public ResponseEntity<Teacher> addTeacher(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(adminService.addTeacher(payload));
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable String id) {
        adminService.deleteTeacher(id);
        return ResponseEntity.ok().build();
    }

    // Departments
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(adminService.createDepartment(department));
    }

    // Courses & Subjects
    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(adminService.createCourse(course));
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(adminService.createSubject(subject));
    }

    // Timetable Management with Conflict Detection
    @PostMapping("/timetable/check-conflict")
    public ResponseEntity<ScheduleConflictDTO> checkConflict(@RequestBody ClassSchedule schedule) {
        return ResponseEntity.ok(adminService.checkTimetableConflict(schedule));
    }

    @PostMapping("/timetable")
    public ResponseEntity<ClassSchedule> addSchedule(@RequestBody ClassSchedule schedule) {
        return ResponseEntity.ok(adminService.addSchedule(schedule));
    }

    // Notices & Events
    @PostMapping("/notices")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        return ResponseEntity.ok(adminService.createNotice(notice));
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(adminService.createEvent(event));
    }
}
