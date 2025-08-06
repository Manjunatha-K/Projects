package com.portal.ExamServer.service;

import com.portal.ExamServer.exception.UserAlreadyExistException;
import com.portal.ExamServer.exception.UserDoesNotExistsException;
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

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(Long userId, User user) {
        User localUser = this.userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistsException());
        localUser.setUsername(user.getUsername());
        localUser.setEmail(user.getEmail());
        localUser.setProfile(user.getProfile());
        localUser.setPassword(user.getPassword());
        localUser.setFirstName(user.getFirstName());
        localUser.setLastName(user.getLastName());
        localUser.setEnabled(user.getEnabled());
        return this.userRepository.save(localUser);
    }
}
