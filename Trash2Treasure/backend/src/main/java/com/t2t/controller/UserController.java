package com.t2t.controller;

import com.t2t.model.User;
import com.t2t.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email address is required"));
        }

        Optional<User> optionalUser = userRepository.findByEmail(email.toLowerCase().trim());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword() != null && user.getPassword().equals(password)) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid password provided"));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Account not found with this email. Please sign up."));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }

        String normalizedEmail = user.getEmail().toLowerCase().trim();
        Optional<User> existing = userRepository.findByEmail(normalizedEmail);
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "An account already exists with this email address"));
        }

        // Initialize Real New Account defaults as requested by user
        user.setEmail(normalizedEmail);
        user.setStatus("ACTIVE");
        user.setEcoPoints(0); // Real new user starts at 0 Points (0% progress!)
        user.setRecycledThisMonthKg(0.0); // 0.0 kg recycled
        user.setMonthlyTargetKg(50.0);
        user.setBadges(Collections.singletonList("New Eco Member"));
        
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("CITIZEN");
        }

        if (user.getAvatar() == null || user.getAvatar().trim().isEmpty()) {
            user.setAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable String id, @RequestBody User updatedData) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (updatedData.getName() != null) user.setName(updatedData.getName());
            if (updatedData.getLocality() != null) user.setLocality(updatedData.getLocality());
            if (updatedData.getAvatar() != null) user.setAvatar(updatedData.getAvatar());
            if (updatedData.getPhone() != null) user.setPhone(updatedData.getPhone());
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/points")
    public ResponseEntity<User> updateEcoPoints(@PathVariable String id, @RequestBody Map<String, Integer> body) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Integer pointsDelta = body.getOrDefault("pointsDelta", 0);
            int newBalance = Math.max(0, (user.getEcoPoints() != null ? user.getEcoPoints() : 0) + pointsDelta);
            user.setEcoPoints(newBalance);
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (body.containsKey("status")) user.setStatus(body.get("status"));
            if (body.containsKey("blockReason")) user.setBlockReason(body.get("blockReason"));
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.notFound().build();
    }
}
