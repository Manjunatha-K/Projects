package com.portal.ExamServer.service;

import com.portal.ExamServer.exception.UserAlreadyExistException;
import com.portal.ExamServer.model.User;
import com.portal.ExamServer.model.UserRole;
import com.portal.ExamServer.repo.RoleRepository;
import com.portal.ExamServer.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;



    //creating User
    @Override
    public User createUser(User user, Set<UserRole> userRoles) {

        User localUser = this.userRepository.findByUsername(user.getUsername());
        if(localUser != null){
            System.out.println("User is already present !!");
            throw new UserAlreadyExistException("User is already present !!");
        }else{
           for(UserRole userRole : userRoles){
               roleRepository.save(userRole.getRole());
           }
           user.getUserRoles().addAll(userRoles);
           localUser = this.userRepository.save(user);
        }
        return localUser;
    }
}
