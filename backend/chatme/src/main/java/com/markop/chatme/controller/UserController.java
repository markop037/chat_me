package com.markop.chatme.controller;

import com.markop.chatme.model.LoginRequest;
import com.markop.chatme.model.User;
import com.markop.chatme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        try{
            if (userService.existsByUsername(user.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already taken");
            }

            if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already taken");
        }

            User savedUser = userService.saveUser(user);
            if (savedUser != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register user!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred during registration!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User validUser = userService.checkUserExists(user.getUsername(), user.getPassword());

        if (validUser != null) {
            LoginRequest loginRequest = new LoginRequest(validUser.getId(),
                    validUser.getUsername(), validUser.getPassword(), user.getEmail(), user.getFullName());
            return ResponseEntity.ok(loginRequest);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
