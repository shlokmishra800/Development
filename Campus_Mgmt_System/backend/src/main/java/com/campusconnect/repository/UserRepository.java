package com.campusconnect.repository;

import com.campusconnect.entity.ERole;
import com.campusconnect.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(ERole role);
    long countByRole(ERole role);
}
