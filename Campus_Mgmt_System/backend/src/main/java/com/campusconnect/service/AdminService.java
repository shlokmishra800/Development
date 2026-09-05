package com.campusconnect.service;

import com.campusconnect.dto.ScheduleConflictDTO;
import com.campusconnect.entity.*;
import com.campusconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmergencyReportRepository emergencyReportRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Admin Dashboard Stats ---
    public Map<String, Object> getAdminDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentRepository.count());
        stats.put("totalTeachers", teacherRepository.count());
        stats.put("totalDepartments", departmentRepository.count());
        stats.put("totalCourses", courseRepository.count());
        stats.put("pendingLeaveRequests", leaveRequestRepository.findByStatus("PENDING").size());
        stats.put("openEmergencyReports", emergencyReportRepository.findByStatusOrderByCreatedAtDesc("OPEN").size());

        // Department distribution chart data
        List<Map<String, Object>> deptDistribution = new ArrayList<>();
        for (Department dept : departmentRepository.findAll()) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", dept.getName());
            item.put("code", dept.getCode());
            item.put("studentsCount", studentRepository.findByDepartmentId(dept.getId()).size());
            item.put("teachersCount", teacherRepository.findByDepartmentId(dept.getId()).size());
            deptDistribution.add(item);
        }
        stats.put("departmentDistribution", deptDistribution);

        return stats;
    }

    // --- Student Management ---
    public List<Map<String, Object>> getAllStudents() {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Student student : studentRepository.findAll()) {
            Map<String, Object> map = new HashMap<>();
            map.put("student", student);
            userRepository.findById(student.getUserId()).ifPresent(u -> {
                map.put("fullName", u.getFullName());
                map.put("email", u.getEmail());
                map.put("phone", u.getPhone());
                map.put("active", u.isActive());
            });
            departmentRepository.findById(student.getDepartmentId()).ifPresent(d -> map.put("departmentName", d.getName()));
            courseRepository.findById(student.getCourseId()).ifPresent(c -> map.put("courseName", c.getName()));
            result.add(map);
        }
        return result;
    }

    public Student addStudent(Map<String, Object> payload) {
        String email = (String) payload.get("email");
        String password = (String) payload.getOrDefault("password", "student123");
        String fullName = (String) payload.get("fullName");
        String phone = (String) payload.get("phone");
        String rollNumber = (String) payload.get("rollNumber");
        String departmentId = (String) payload.get("departmentId");
        String courseId = (String) payload.get("courseId");
        int semester = payload.get("semester") != null ? Integer.parseInt(payload.get("semester").toString()) : 1;

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists!");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .phone(phone)
                .role(ERole.ROLE_STUDENT)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);

        Student student = Student.builder()
                .userId(savedUser.getId())
                .rollNumber(rollNumber != null ? rollNumber : "STU-" + System.currentTimeMillis() % 10000)
                .departmentId(departmentId)
                .courseId(courseId)
                .semester(semester)
                .batch((String) payload.getOrDefault("batch", "2023-2027"))
                .guardianContact((String) payload.get("guardianContact"))
                .address((String) payload.get("address"))
                .build();

        return studentRepository.save(student);
    }

    public void deleteStudent(String studentId) {
        studentRepository.findById(studentId).ifPresent(s -> {
            userRepository.deleteById(s.getUserId());
            studentRepository.deleteById(studentId);
        });
    }

    // --- Teacher Management ---
    public List<Map<String, Object>> getAllTeachers() {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Teacher teacher : teacherRepository.findAll()) {
            Map<String, Object> map = new HashMap<>();
            map.put("teacher", teacher);
            userRepository.findById(teacher.getUserId()).ifPresent(u -> {
                map.put("fullName", u.getFullName());
                map.put("email", u.getEmail());
                map.put("phone", u.getPhone());
                map.put("active", u.isActive());
            });
            departmentRepository.findById(teacher.getDepartmentId()).ifPresent(d -> map.put("departmentName", d.getName()));
            result.add(map);
        }
        return result;
    }

    public Teacher addTeacher(Map<String, Object> payload) {
        String email = (String) payload.get("email");
        String password = (String) payload.getOrDefault("password", "teacher123");
        String fullName = (String) payload.get("fullName");
        String phone = (String) payload.get("phone");
        String employeeId = (String) payload.get("employeeId");
        String departmentId = (String) payload.get("departmentId");
        String designation = (String) payload.get("designation");
        String qualification = (String) payload.get("qualification");
        String specialization = (String) payload.get("specialization");

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists!");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .phone(phone)
                .role(ERole.ROLE_TEACHER)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);

        Teacher teacher = Teacher.builder()
                .userId(savedUser.getId())
                .employeeId(employeeId != null ? employeeId : "EMP-" + System.currentTimeMillis() % 10000)
                .departmentId(departmentId)
                .designation(designation)
                .qualification(qualification)
                .specialization(specialization)
                .build();

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(String teacherId) {
        teacherRepository.findById(teacherId).ifPresent(t -> {
            userRepository.deleteById(t.getUserId());
            teacherRepository.deleteById(teacherId);
        });
    }

    // --- Department, Course, Subject ---
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    // --- Timetable Management & Conflict Detection ---
    public ScheduleConflictDTO checkTimetableConflict(ClassSchedule schedule) {
        // Check if teacher is already assigned to another class on the same day and time
        List<ClassSchedule> teacherSchedules = classScheduleRepository.findByTeacherIdAndDayOfWeek(
                schedule.getTeacherId(), schedule.getDayOfWeek());

        for (ClassSchedule existing : teacherSchedules) {
            if (!existing.getId().equals(schedule.getId())) {
                if (existing.getStartTime().equals(schedule.getStartTime())) {
                    Subject sub = subjectRepository.findById(existing.getSubjectId()).orElse(null);
                    return ScheduleConflictDTO.builder()
                            .conflict(true)
                            .conflictReason("Teacher is already assigned to another class at this time (" + existing.getStartTime() + " - " + existing.getEndTime() + ").")
                            .existingSubjectName(sub != null ? sub.getName() : "Existing Subject")
                            .existingRoomNumber(existing.getRoomNumber())
                            .build();
                }
            }
        }

        return ScheduleConflictDTO.builder().conflict(false).build();
    }

    public ClassSchedule addSchedule(ClassSchedule schedule) {
        ScheduleConflictDTO conflict = checkTimetableConflict(schedule);
        if (conflict.isConflict()) {
            throw new RuntimeException("Conflict Detected: " + conflict.getConflictReason());
        }
        return classScheduleRepository.save(schedule);
    }

    public Notice createNotice(Notice notice) {
        notice.setCreatedAt(LocalDateTime.now());
        return noticeRepository.save(notice);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
}
