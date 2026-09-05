package com.campusconnect.repository;

import com.campusconnect.entity.StudyMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StudyMaterialRepository extends MongoRepository<StudyMaterial, String> {
    List<StudyMaterial> findBySubjectId(String subjectId);
    List<StudyMaterial> findByTeacherId(String teacherId);
}
