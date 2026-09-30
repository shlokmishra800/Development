package com.t2t.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "smart_bins")
public class SmartBin {
    @Id
    private String id;
    private String name;
    private String binType; // ORGANIC, RECYCLABLE, E_WASTE, HAZARD, GENERAL
    private Integer fillPercentage;
    private Boolean isAvailable;
    private Double latitude;
    private Double longitude;
    private String address;
    private LocalDateTime lastEmptiedAt;
}
