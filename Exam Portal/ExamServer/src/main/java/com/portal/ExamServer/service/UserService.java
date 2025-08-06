package com.portal.ExamServer.service;

import com.portal.ExamServer.model.User;
import com.portal.ExamServer.model.UserRole;

import java.util.Set;

public interface UserService {

    public User createUser(User user, Set<UserRole> userRoles);

    public User getUser(String username);

    public void deleteUser(Long userId);

    User updateUser(Long userId, User user);
}
