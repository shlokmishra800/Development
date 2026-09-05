package com.campusconnect.repository;

import com.campusconnect.entity.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByStudentIdAndSubjectId(String studentId, String subjectId);
    List<Attendance> findBySubjectIdAndDate(String subjectId, LocalDate date);
}
