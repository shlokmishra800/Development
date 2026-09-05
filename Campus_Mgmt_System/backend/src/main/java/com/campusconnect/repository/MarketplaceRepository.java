package com.campusconnect.repository;

import com.campusconnect.entity.MarketplaceItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MarketplaceRepository extends MongoRepository<MarketplaceItem, String> {
    List<MarketplaceItem> findByStatusOrderByCreatedAtDesc(String status);
    List<MarketplaceItem> findByCategory(String category);
}
