package com.t2t.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @GetMapping("/summary")
    public Map<String, Object> getAnalyticsSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalWasteReportedKg", 14250.5);
        summary.put("totalResolvedComplaints", 482);
        summary.put("totalCo2SavedKg", 8940.0);
        summary.put("totalWaterSavedLiters", 34200.0);
        summary.put("averageResolutionHours", 4.2);
        summary.put("activeSmartBins", 38);
        summary.put("ecoPointsRedeemed", 125400);
        return summary;
    }
}
