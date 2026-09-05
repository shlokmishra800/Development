package com.campusconnect.service;

import com.campusconnect.dto.JwtResponse;
import com.campusconnect.dto.LoginRequest;
import com.campusconnect.dto.MessageResponse;
import com.campusconnect.dto.SignupRequest;
import com.campusconnect.entity.*;
import com.campusconnect.repository.*;
import com.campusconnect.security.JwtUtils;
import com.campusconnect.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String roleStr = userDetails.getAuthorities().iterator().next().getAuthority();

        Object profileDetails = null;
        if (roleStr.equals("ROLE_STUDENT")) {
            profileDetails = studentRepository.findByUserId(userDetails.getId()).orElse(null);
        } else if (roleStr.equals("ROLE_TEACHER")) {
            profileDetails = teacherRepository.findByUserId(userDetails.getId()).orElse(null);
        }

        return JwtResponse.builder()
                .token(jwt)
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .fullName(userDetails.getFullName())
                .role(roleStr)
                .profileDetails(profileDetails)
                .build();
    }

    public MessageResponse registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        ERole role = ERole.ROLE_STUDENT;
        if (signupRequest.getRole() != null) {
            switch (signupRequest.getRole().toUpperCase()) {
                case "ADMIN":
                    role = ERole.ROLE_ADMIN;
                    break;
                case "TEACHER":
                    role = ERole.ROLE_TEACHER;
                    break;
                default:
                    role = ERole.ROLE_STUDENT;
            }
        }

        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .fullName(signupRequest.getFullName())
                .phone(signupRequest.getPhone())
                .role(role)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        // Create profile if STUDENT or TEACHER
        if (role == ERole.ROLE_STUDENT) {
            Student student = Student.builder()
                    .userId(savedUser.getId())
                    .rollNumber("REG-" + System.currentTimeMillis() % 100000)
                    .semester(1)
                    .build();
            studentRepository.save(student);
        } else if (role == ERole.ROLE_TEACHER) {
            Teacher teacher = Teacher.builder()
                    .userId(savedUser.getId())
                    .employeeId("EMP-" + System.currentTimeMillis() % 10000)
                    .designation("Assistant Professor")
                    .build();
            teacherRepository.save(teacher);
        }

        return new MessageResponse("User registered successfully!");
    }
}
