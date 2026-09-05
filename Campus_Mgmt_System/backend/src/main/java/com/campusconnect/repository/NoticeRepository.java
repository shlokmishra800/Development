package com.campusconnect.repository;

import com.campusconnect.entity.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoticeRepository extends MongoRepository<Notice, String> {
    List<Notice> findByTargetAudienceIn(List<String> audiences);
    List<Notice> findByCategory(String category);
}
