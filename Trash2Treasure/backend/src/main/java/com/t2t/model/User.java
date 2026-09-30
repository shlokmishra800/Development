package com.t2t.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String role; // CITIZEN, COLLECTOR, ADMIN
    private String status; // ACTIVE, BLOCKED
    private String blockReason;
    private Integer ecoPoints;
    private List<String> badges;
    private Double monthlyTargetKg;
    private Double recycledThisMonthKg;
    private String avatar;
    private String locality;
    private String phone;
    private String vehicleId;
}
