package com.t2t.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rewards")
public class Reward {
    @Id
    private String id;
    private String title;
    private String partnerName;
    private String category; // CAFE, GROCERY, SHOPPING, CINEMA
    private String description;
    private String code;
    private Integer discountPercent;
    private Integer ecoPointsCost;
    private String imageUrl;
}
