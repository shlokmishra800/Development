package com.campusconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "marketplace")
public class MarketplaceItem {

    @Id
    private String id;
    private String title;
    private String description;
    private double price;
    private String itemCondition; // LIKE_NEW, GOOD, FAIR
    private String category;
    private String sellerId;
    private String sellerName;
    private String contactPhone;
    private String imageUrl;
    private String status; // AVAILABLE, SOLD
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
