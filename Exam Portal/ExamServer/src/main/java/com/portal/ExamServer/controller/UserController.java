package com.portal.ExamServer.controller;

import com.portal.ExamServer.model.Role;
import com.portal.ExamServer.model.User;
import com.portal.ExamServer.model.UserRole;
import com.portal.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public User createUser(@RequestBody User user){
        user.setProfile("default.png");
        Set<UserRole> userRoles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(44L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoles.add(userRole);

      return this.userService.createUser(user,userRoles);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
      return this.userService.getUser(username);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }


    @PutMapping("/{userId}")
    public User updateUser(@PathVariable("userId") Long userId, @RequestBody User user){
        return this.userService.updateUser(userId,user);
    }
}
