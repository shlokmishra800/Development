package com.campusconnect.service;

import com.campusconnect.entity.*;
import com.campusconnect.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

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
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private StudyMaterialRepository studyMaterialRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private LostFoundRepository lostFoundRepository;

    @Autowired
    private MarketplaceRepository marketplaceRepository;

    @Autowired
    private EmergencyReportRepository emergencyReportRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing Seed Data for CampusConnect...");

        // Seed Admin if not exists
        if (!userRepository.existsByEmail("admin@campus.edu")) {
            User adminUser = User.builder()
                    .email("admin@campus.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("System Administrator")
                    .phone("+91 9876543210")
                    .role(ERole.ROLE_ADMIN)
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            userRepository.save(adminUser);
            logger.info("Created default Admin user: admin@campus.edu / admin123");
        }

        // Seed Department
        Department cseDept = departmentRepository.findByCode("CSE")
                .orElseGet(() -> departmentRepository.save(Department.builder()
                        .code("CSE")
                        .name("Computer Science & Engineering")
                        .description("Department of Computer Science and Intelligent Systems")
                        .headOfDepartment("Dr. R. K. Sharma")
                        .build()));

        Department eceDept = departmentRepository.findByCode("ECE")
                .orElseGet(() -> departmentRepository.save(Department.builder()
                        .code("ECE")
                        .name("Electronics & Communication")
                        .description("Department of Microelectronics and Networks")
                        .headOfDepartment("Dr. Ananya Verma")
                        .build()));

        // Seed Course
        Course btechCse = courseRepository.findByDepartmentId(cseDept.getId()).stream().findFirst()
                .orElseGet(() -> courseRepository.save(Course.builder()
                        .code("BTECH-CSE")
                        .name("B.Tech Computer Science")
                        .departmentId(cseDept.getId())
                        .durationYears(4)
                        .totalSemesters(8)
                        .build()));

        // Seed Teacher
        User teacherUser = userRepository.findByEmail("teacher@campus.edu").orElse(null);
        if (teacherUser == null) {
            teacherUser = userRepository.save(User.builder()
                    .email("teacher@campus.edu")
                    .password(passwordEncoder.encode("teacher123"))
                    .fullName("Prof. Alok Sharma")
                    .phone("+91 9876543211")
                    .role(ERole.ROLE_TEACHER)
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .build());

            Teacher teacherProfile = Teacher.builder()
                    .userId(teacherUser.getId())
                    .employeeId("EMP-1001")
                    .departmentId(cseDept.getId())
                    .designation("Associate Professor")
                    .qualification("Ph.D. in Computer Science")
                    .specialization("Distributed Systems & Data Science")
                    .build();
            teacherRepository.save(teacherProfile);
            logger.info("Created default Teacher user: teacher@campus.edu / teacher123");
        }

        Teacher teacherObj = teacherRepository.findByUserId(teacherUser.getId()).orElse(null);

        // Seed Subjects
        Subject javaSub = subjectRepository.findByCourseId(btechCse.getId()).stream()
                .filter(s -> s.getCode().equals("CS501")).findFirst()
                .orElseGet(() -> subjectRepository.save(Subject.builder()
                        .code("CS501")
                        .name("Java Programming")
                        .courseId(btechCse.getId())
                        .departmentId(cseDept.getId())
                        .semester(5)
                        .teacherId(teacherObj != null ? teacherObj.getId() : "")
                        .credits(4)
                        .build()));

        Subject dbmsSub = subjectRepository.findByCourseId(btechCse.getId()).stream()
                .filter(s -> s.getCode().equals("CS502")).findFirst()
                .orElseGet(() -> subjectRepository.save(Subject.builder()
                        .code("CS502")
                        .name("Database Management Systems")
                        .courseId(btechCse.getId())
                        .departmentId(cseDept.getId())
                        .semester(5)
                        .teacherId(teacherObj != null ? teacherObj.getId() : "")
                        .credits(4)
                        .build()));

        Subject cnSub = subjectRepository.findByCourseId(btechCse.getId()).stream()
                .filter(s -> s.getCode().equals("CS503")).findFirst()
                .orElseGet(() -> subjectRepository.save(Subject.builder()
                        .code("CS503")
                        .name("Computer Networks")
                        .courseId(btechCse.getId())
                        .departmentId(cseDept.getId())
                        .semester(5)
                        .teacherId(teacherObj != null ? teacherObj.getId() : "")
                        .credits(3)
                        .build()));

        Subject mathSub = subjectRepository.findByCourseId(btechCse.getId()).stream()
                .filter(s -> s.getCode().equals("MATH504")).findFirst()
                .orElseGet(() -> subjectRepository.save(Subject.builder()
                        .code("MATH504")
                        .name("Discrete Mathematics")
                        .courseId(btechCse.getId())
                        .departmentId(cseDept.getId())
                        .semester(5)
                        .teacherId(teacherObj != null ? teacherObj.getId() : "")
                        .credits(4)
                        .build()));

        // Assign subjects to teacher
        if (teacherObj != null && (teacherObj.getAssignedSubjectIds() == null || teacherObj.getAssignedSubjectIds().isEmpty())) {
            teacherObj.setAssignedSubjectIds(Arrays.asList(javaSub.getId(), dbmsSub.getId(), cnSub.getId(), mathSub.getId()));
            teacherRepository.save(teacherObj);
        }

        // Seed Student (Shlok Mishra / student@campus.edu)
        User studentUser = userRepository.findByEmail("student@campus.edu").orElse(null);
        if (studentUser == null) {
            studentUser = userRepository.save(User.builder()
                    .email("student@campus.edu")
                    .password(passwordEncoder.encode("student123"))
                    .fullName("Shlok Mishra")
                    .phone("+91 9876543212")
                    .role(ERole.ROLE_STUDENT)
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .build());

            Student studentProfile = Student.builder()
                    .userId(studentUser.getId())
                    .rollNumber("2026CSE001")
                    .departmentId(cseDept.getId())
                    .courseId(btechCse.getId())
                    .semester(5)
                    .batch("2023-2027")
                    .guardianContact("+91 9988776655")
                    .address("Block A, Campus Residency, New Delhi")
                    .build();
            studentRepository.save(studentProfile);
            logger.info("Created default Student user: student@campus.edu / student123");
        }

        Student studentObj = studentRepository.findByUserId(studentUser.getId()).orElse(null);

        // Seed Schedules if empty
        if (classScheduleRepository.count() == 0 && teacherObj != null) {
            classScheduleRepository.save(ClassSchedule.builder()
                    .courseId(btechCse.getId())
                    .subjectId(javaSub.getId())
                    .teacherId(teacherObj.getId())
                    .semester(5)
                    .dayOfWeek("MONDAY")
                    .startTime("09:30")
                    .endTime("10:30")
                    .roomNumber("A-204")
                    .build());

            classScheduleRepository.save(ClassSchedule.builder()
                    .courseId(btechCse.getId())
                    .subjectId(dbmsSub.getId())
                    .teacherId(teacherObj.getId())
                    .semester(5)
                    .dayOfWeek("MONDAY")
                    .startTime("10:45")
                    .endTime("11:45")
                    .roomNumber("Lab-3")
                    .build());

            classScheduleRepository.save(ClassSchedule.builder()
                    .courseId(btechCse.getId())
                    .subjectId(cnSub.getId())
                    .teacherId(teacherObj.getId())
                    .semester(5)
                    .dayOfWeek("TUESDAY")
                    .startTime("09:30")
                    .endTime("10:30")
                    .roomNumber("B-102")
                    .build());
        }

        // Seed Attendance Data if empty
        if (attendanceRepository.count() == 0 && studentObj != null) {
            // Java (90%)
            for (int i = 1; i <= 10; i++) {
                attendanceRepository.save(Attendance.builder()
                        .studentId(studentObj.getId())
                        .subjectId(javaSub.getId())
                        .date(LocalDate.now().minusDays(i))
                        .status(i == 3 ? "ABSENT" : "PRESENT")
                        .build());
            }
            // Math (68% - Warning)
            for (int i = 1; i <= 10; i++) {
                attendanceRepository.save(Attendance.builder()
                        .studentId(studentObj.getId())
                        .subjectId(mathSub.getId())
                        .date(LocalDate.now().minusDays(i))
                        .status((i == 2 || i == 5 || i == 8) ? "ABSENT" : "PRESENT")
                        .build());
            }
        }

        // Seed Assignments if empty
        if (assignmentRepository.count() == 0 && teacherObj != null) {
            Assignment assign1 = assignmentRepository.save(Assignment.builder()
                    .title("Spring Boot & Microservices Project")
                    .description("Build a RESTful service with JWT security and MongoDB Atlas integration.")
                    .subjectId(javaSub.getId())
                    .teacherId(teacherObj.getId())
                    .courseId(btechCse.getId())
                    .semester(5)
                    .dueDate(LocalDateTime.now().plusDays(3))
                    .maxMarks(100.0)
                    .createdAt(LocalDateTime.now())
                    .build());

            Assignment assign2 = assignmentRepository.save(Assignment.builder()
                    .title("Database Normalization & Query Tuning")
                    .description("Submit 3NF schema design and optimized query execution plans.")
                    .subjectId(dbmsSub.getId())
                    .teacherId(teacherObj.getId())
                    .courseId(btechCse.getId())
                    .semester(5)
                    .dueDate(LocalDateTime.now().plusDays(5))
                    .maxMarks(50.0)
                    .createdAt(LocalDateTime.now())
                    .build());
        }

        // Seed Notices
        if (noticeRepository.count() == 0) {
            noticeRepository.save(Notice.builder()
                    .title("Mid-Semester Examination Schedule Announced")
                    .content("The Mid-Semester exams for Semester 5 will commence from 15th October 2026.")
                    .category("EXAM")
                    .targetAudience("ALL")
                    .createdBy("Admin")
                    .createdAt(LocalDateTime.now())
                    .build());

            noticeRepository.save(Notice.builder()
                    .title("Annual TechFest Hackathon Registration Open")
                    .content("Join CampusConnect Hackathon 2026. Exciting cash prizes and internship opportunities!")
                    .category("EVENT")
                    .targetAudience("ALL")
                    .createdBy("Admin")
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build());
        }

        // Seed Events
        if (eventRepository.count() == 0) {
            eventRepository.save(Event.builder()
                    .title("CampusConnect Smart Hackathon 2026")
                    .description("24-Hour full-stack web development and AI solution build challenge.")
                    .location("Main Auditorium & Innovation Lab")
                    .eventDate(LocalDateTime.now().plusDays(10))
                    .organizer("Department of CSE")
                    .category("Hackathon")
                    .bannerUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800")
                    .build());

            eventRepository.save(Event.builder()
                    .title("AI & Cloud Computing Workshop")
                    .description("Hands-on session with industry experts on modern cloud architectures.")
                    .location("Seminar Hall B")
                    .eventDate(LocalDateTime.now().plusDays(14))
                    .organizer("IEEE Student Branch")
                    .category("Workshop")
                    .bannerUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800")
                    .build());
        }

        // Seed Results
        if (resultRepository.count() == 0 && studentObj != null) {
            resultRepository.save(Result.builder()
                    .studentId(studentObj.getId())
                    .subjectId(javaSub.getId())
                    .examType("MID_TERM")
                    .marksObtained(92.0)
                    .maxMarks(100.0)
                    .grade("A+")
                    .semester(5)
                    .build());

            resultRepository.save(Result.builder()
                    .studentId(studentObj.getId())
                    .subjectId(dbmsSub.getId())
                    .examType("MID_TERM")
                    .marksObtained(85.0)
                    .maxMarks(100.0)
                    .grade("A")
                    .semester(5)
                    .build());
        }

        // Seed Lost and Found
        if (lostFoundRepository.count() == 0 && studentUser != null) {
            lostFoundRepository.save(LostFoundItem.builder()
                    .title("Blue Scientific Calculator (Casio fx-991EX)")
                    .description("Left in Room A-204 after Java class.")
                    .type("LOST")
                    .location("Room A-204")
                    .contactInfo("Call Shlok: 9876543212")
                    .reporterId(studentUser.getId())
                    .status("OPEN")
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build());
        }

        // Seed Marketplace
        if (marketplaceRepository.count() == 0 && studentUser != null) {
            marketplaceRepository.save(MarketplaceItem.builder()
                    .title("Operating System Concepts (Silberschatz 10th Ed)")
                    .description("Brand new condition textbook with zero markings.")
                    .price(450.0)
                    .itemCondition("LIKE_NEW")
                    .category("Textbooks")
                    .sellerId(studentUser.getId())
                    .sellerName("Shlok Mishra")
                    .contactPhone("+91 9876543212")
                    .status("AVAILABLE")
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build());
        }

        logger.info("Seed data initialization complete.");
    }
}
