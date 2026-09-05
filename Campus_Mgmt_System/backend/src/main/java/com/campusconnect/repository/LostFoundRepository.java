package com.campusconnect.repository;

import com.campusconnect.entity.LostFoundItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LostFoundRepository extends MongoRepository<LostFoundItem, String> {
    List<LostFoundItem> findByStatusOrderByCreatedAtDesc(String status);
    List<LostFoundItem> findByType(String type);
}
