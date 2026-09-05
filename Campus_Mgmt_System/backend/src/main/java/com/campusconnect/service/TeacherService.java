package com.campusconnect.service;

import com.campusconnect.dto.AtRiskStudentDTO;
import com.campusconnect.entity.*;
import com.campusconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private StudyMaterialRepository studyMaterialRepository;

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    public Teacher getTeacherProfileByUserId(String userId) {
        return teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Teacher profile not found for user: " + userId));
    }

    public List<Subject> getTeacherAssignedSubjects(String teacherId) {
        return subjectRepository.findByTeacherId(teacherId);
    }

    public List<ClassSchedule> getTeacherSchedule(String teacherId) {
        return classScheduleRepository.findByTeacherId(teacherId);
    }

    // --- At-Risk Student Detection Engine ---
    public List<AtRiskStudentDTO> getAtRiskStudents(String teacherId) {
        List<Subject> subjects = subjectRepository.findByTeacherId(teacherId);
        List<String> subjectIds = subjects.stream().map(Subject::getId).collect(Collectors.toList());

        List<Student> allStudents = studentRepository.findAll();
        List<AtRiskStudentDTO> atRiskList = new ArrayList<>();

        for (Student student : allStudents) {
            User u = userRepository.findById(student.getUserId()).orElse(null);
            String name = u != null ? u.getFullName() : "Student (" + student.getRollNumber() + ")";

            // Calculate attendance percentage for this teacher's subjects
            List<Attendance> attendances = attendanceRepository.findByStudentId(student.getId()).stream()
                    .filter(a -> subjectIds.contains(a.getSubjectId()))
                    .collect(Collectors.toList());

            long totalClasses = attendances.size();
            long presentClasses = attendances.stream().filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus())).count();
            double attendancePct = totalClasses > 0 ? ((double) presentClasses / totalClasses) * 100 : 100.0;

            // Calculate missing assignments
            List<Assignment> teacherAssignments = assignmentRepository.findAll().stream()
                    .filter(a -> subjectIds.contains(a.getSubjectId()))
                    .collect(Collectors.toList());

            int missingAssignments = 0;
            for (Assignment assign : teacherAssignments) {
                Optional<Submission> sub = submissionRepository.findByAssignmentIdAndStudentId(assign.getId(), student.getId());
                if (sub.isEmpty()) {
                    missingAssignments++;
                }
            }

            // Calculate average marks
            List<Result> results = resultRepository.findByStudentId(student.getId());
            double avgMarks = results.isEmpty() ? 75.0 : results.stream().mapToDouble(Result::getMarksObtained).average().orElse(75.0);

            // Determine Risk Level
            String riskLevel = "LOW";
            List<String> reasons = new ArrayList<>();

            if (attendancePct < 75.0) {
                riskLevel = "HIGH";
                reasons.add("Attendance below 75% (" + String.format("%.1f", attendancePct) + "%)");
            }
            if (missingAssignments >= 2) {
                if (!riskLevel.equals("HIGH")) riskLevel = "MEDIUM";
                reasons.add(missingAssignments + " missing assignments");
            }
            if (avgMarks < 50.0) {
                riskLevel = "HIGH";
                reasons.add("Low average marks (" + String.format("%.1f", avgMarks) + "%)");
            }

            if (!riskLevel.equals("LOW")) {
                atRiskList.add(AtRiskStudentDTO.builder()
                        .studentId(student.getId())
                        .fullName(name)
                        .rollNumber(student.getRollNumber())
                        .attendancePercentage(Math.round(attendancePct * 10.0) / 10.0)
                        .missingAssignmentsCount(missingAssignments)
                        .averageMarks(Math.round(avgMarks * 10.0) / 10.0)
                        .riskLevel(riskLevel)
                        .reason(String.join(", ", reasons))
                        .build());
            }
        }

        return atRiskList;
    }

    // --- Mark Attendance ---
    public void markBulkAttendance(List<Map<String, Object>> attendanceRecords) {
        for (Map<String, Object> record : attendanceRecords) {
            String studentId = (String) record.get("studentId");
            String subjectId = (String) record.get("subjectId");
            String status = (String) record.get("status");
            String dateStr = (String) record.get("date");
            LocalDate date = dateStr != null ? LocalDate.parse(dateStr) : LocalDate.now();

            List<Attendance> existing = attendanceRepository.findByStudentIdAndSubjectId(studentId, subjectId);
            Optional<Attendance> todayAtt = existing.stream().filter(a -> a.getDate().equals(date)).findFirst();

            if (todayAtt.isPresent()) {
                Attendance att = todayAtt.get();
                att.setStatus(status);
                attendanceRepository.save(att);
            } else {
                Attendance att = Attendance.builder()
                        .studentId(studentId)
                        .subjectId(subjectId)
                        .date(date)
                        .status(status)
                        .build();
                attendanceRepository.save(att);
            }
        }
    }

    // --- Assignments & Submissions ---
    public Assignment createAssignment(Assignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public List<Submission> getSubmissionsForAssignment(String assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }

    public Submission gradeSubmission(String submissionId, double marks, String feedback) {
        Submission sub = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        sub.setMarksObtained(marks);
        sub.setFeedback(feedback);
        sub.setStatus("GRADED");
        return submissionRepository.save(sub);
    }

    // --- Leave Request Review ---
    public LeaveRequest reviewLeaveRequest(String requestId, String status, String remarks) {
        LeaveRequest req = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        req.setStatus(status);
        req.setTeacherRemarks(remarks);
        return leaveRequestRepository.save(req);
    }
}
