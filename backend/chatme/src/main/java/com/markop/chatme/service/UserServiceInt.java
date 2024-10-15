package com.markop.chatme.service;

import com.markop.chatme.model.User;

public interface UserServiceInt {
    public User saveUser(User user);
    public boolean checkUserExists(String username, String password);
}
