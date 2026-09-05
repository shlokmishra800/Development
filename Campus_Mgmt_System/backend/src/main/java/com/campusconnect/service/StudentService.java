package com.campusconnect.service;

import com.campusconnect.entity.*;
import com.campusconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public Student getStudentProfileByUserId(String userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found for user: " + userId));
    }

    // --- Student Dashboard Summary ---
    public Map<String, Object> getStudentDashboardSummary(String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Map<String, Object> summary = new HashMap<>();

        // Overall Attendance
        List<Attendance> attendances = attendanceRepository.findByStudentId(studentId);
        long totalClasses = attendances.size();
        long presentClasses = attendances.stream().filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus())).count();
        double overallPct = totalClasses > 0 ? ((double) presentClasses / totalClasses) * 100 : 0.0;
        summary.put("overallAttendancePercentage", Math.round(overallPct * 10.0) / 10.0);

        // Subject-Wise Attendance Breakdown
        List<Subject> subjects = subjectRepository.findByCourseIdAndSemester(student.getCourseId(), student.getSemester());
        List<Map<String, Object>> subjectAttendance = new ArrayList<>();
        boolean lowAttendanceWarning = false;

        for (Subject sub : subjects) {
            List<Attendance> subAtt = attendanceRepository.findByStudentIdAndSubjectId(studentId, sub.getId());
            long subTotal = subAtt.size();
            long subPresent = subAtt.stream().filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus())).count();
            double pct = subTotal > 0 ? ((double) subPresent / subTotal) * 100 : 100.0;

            Map<String, Object> item = new HashMap<>();
            item.put("subjectId", sub.getId());
            item.put("subjectName", sub.getName());
            item.put("subjectCode", sub.getCode());
            item.put("percentage", Math.round(pct * 10.0) / 10.0);
            item.put("present", subPresent);
            item.put("absent", subTotal - subPresent);
            item.put("warning", pct < 75.0);

            if (pct < 75.0) {
                lowAttendanceWarning = true;
            }
            subjectAttendance.add(item);
        }
        summary.put("subjectAttendance", subjectAttendance);
        summary.put("lowAttendanceWarning", lowAttendanceWarning);

        // Pending Assignments Count
        List<Assignment> courseAssignments = assignmentRepository.findByCourseIdAndSemester(student.getCourseId(), student.getSemester());
        int pendingAssignments = 0;
        for (Assignment assign : courseAssignments) {
            Optional<Submission> sub = submissionRepository.findByAssignmentIdAndStudentId(assign.getId(), studentId);
            if (sub.isEmpty()) {
                pendingAssignments++;
            }
        }
        summary.put("pendingAssignmentsCount", pendingAssignments);

        // Next Class Calculator
        String todayDay = LocalDate.now().getDayOfWeek().name();
        List<ClassSchedule> todaySchedules = classScheduleRepository.findByCourseIdAndSemesterAndDayOfWeek(
                student.getCourseId(), student.getSemester(), todayDay);

        LocalTime now = LocalTime.now();
        ClassSchedule nextClass = null;
        for (ClassSchedule cs : todaySchedules) {
            LocalTime startTime = LocalTime.parse(cs.getStartTime());
            if (startTime.isAfter(now)) {
                nextClass = cs;
                break;
            }
        }

        if (nextClass != null) {
            Map<String, Object> nextClassMap = new HashMap<>();
            Subject sub = subjectRepository.findById(nextClass.getSubjectId()).orElse(null);
            nextClassMap.put("subjectName", sub != null ? sub.getName() : "Upcoming Class");
            nextClassMap.put("startTime", nextClass.getStartTime());
            nextClassMap.put("roomNumber", nextClass.getRoomNumber());
            summary.put("nextClass", nextClassMap);
        } else {
            summary.put("nextClass", null);
        }

        return summary;
    }

    // --- Submit Assignment ---
    public Submission submitAssignment(String assignmentId, String studentId, String contentUrl, String submissionText) {
        Optional<Submission> existing = submissionRepository.findByAssignmentIdAndStudentId(assignmentId, studentId);
        Submission sub;
        if (existing.isPresent()) {
            sub = existing.get();
            sub.setContentUrl(contentUrl);
            sub.setSubmissionText(submissionText);
            sub.setSubmissionDate(LocalDateTime.now());
            sub.setStatus("SUBMITTED");
        } else {
            sub = Submission.builder()
                    .assignmentId(assignmentId)
                    .studentId(studentId)
                    .contentUrl(contentUrl)
                    .submissionText(submissionText)
                    .submissionDate(LocalDateTime.now())
                    .status("SUBMITTED")
                    .build();
        }
        return submissionRepository.save(sub);
    }

    // --- Leave Request ---
    public LeaveRequest applyForLeave(LeaveRequest request) {
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        return leaveRequestRepository.save(request);
    }

    // --- Register for Event ---
    public Event registerForEvent(String eventId, String userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (!event.getRegisteredUserIds().contains(userId)) {
            event.getRegisteredUserIds().add(userId);
            eventRepository.save(event);
        }
        return event;
    }
}
