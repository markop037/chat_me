package com.markop.chatme.service;

import com.markop.chatme.user.User;

import java.util.List;


public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
