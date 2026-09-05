package com.campusconnect.controller;

import com.campusconnect.entity.EmergencyReport;
import com.campusconnect.entity.LostFoundItem;
import com.campusconnect.entity.MarketplaceItem;
import com.campusconnect.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class CommonController {

    @Autowired
    private CommonService commonService;

    @GetMapping("/notices")
    public ResponseEntity<List<com.campusconnect.entity.Notice>> getNotices() {
        return ResponseEntity.ok(commonService.getAllNotices());
    }

    @GetMapping("/events")
    public ResponseEntity<List<com.campusconnect.entity.Event>> getEvents() {
        return ResponseEntity.ok(commonService.getAllEvents());
    }

    @GetMapping("/lost-found")
    public ResponseEntity<List<LostFoundItem>> getLostFoundItems() {
        return ResponseEntity.ok(commonService.getAllLostFoundItems());
    }

    @PostMapping("/lost-found")
    public ResponseEntity<LostFoundItem> createLostFoundItem(@RequestBody LostFoundItem item) {
        return ResponseEntity.ok(commonService.createLostFoundItem(item));
    }

    @GetMapping("/marketplace")
    public ResponseEntity<List<MarketplaceItem>> getMarketplaceItems() {
        return ResponseEntity.ok(commonService.getAllMarketplaceItems());
    }

    @PostMapping("/marketplace")
    public ResponseEntity<MarketplaceItem> createMarketplaceItem(@RequestBody MarketplaceItem item) {
        return ResponseEntity.ok(commonService.createMarketplaceItem(item));
    }

    @PostMapping("/emergency-reports")
    public ResponseEntity<EmergencyReport> createEmergencyReport(@RequestBody EmergencyReport report) {
        return ResponseEntity.ok(commonService.createEmergencyReport(report));
    }

    @PostMapping("/ai-chatbot")
    public ResponseEntity<Map<String, String>> aiChatbot(
            @RequestParam String prompt,
            @RequestParam(required = false, defaultValue = "STUDENT") String role) {
        return ResponseEntity.ok(commonService.getAiChatbotResponse(prompt, role));
    }
}
