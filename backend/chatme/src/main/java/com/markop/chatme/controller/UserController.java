package com.markop.chatme.controller;

import com.markop.chatme.service.UserService;
import com.markop.chatme.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "You have successfully registered!";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
