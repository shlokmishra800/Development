package com.t2t.controller;

import com.t2t.model.SmartBin;
import com.t2t.repository.SmartBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bins")
@CrossOrigin(origins = "*")
public class BinController {

    @Autowired
    private SmartBinRepository smartBinRepository;

    @GetMapping
    public List<SmartBin> getAllBins() {
        return smartBinRepository.findAll();
    }

    @PutMapping("/{id}/capacity")
    public ResponseEntity<SmartBin> updateCapacity(@PathVariable String id, @RequestBody Map<String, Integer> body) {
        Optional<SmartBin> optional = smartBinRepository.findById(id);
        if (optional.isPresent()) {
            SmartBin bin = optional.get();
            Integer fill = body.get("fillPercentage");
            bin.setFillPercentage(fill);
            if (fill == 0) {
                bin.setLastEmptiedAt(LocalDateTime.now());
            }
            return ResponseEntity.ok(smartBinRepository.save(bin));
        }
        return ResponseEntity.notFound().build();
    }
}
