package com.example.TaskManagerApp.TaskManagerApp.service;

import com.example.TaskManagerApp.TaskManagerApp.exception.ObjectNotFoundException;
import com.example.TaskManagerApp.TaskManagerApp.model.BoardMembers;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.repository.BoardRepository;
import com.example.TaskManagerApp.TaskManagerApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(int id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("User not found"));
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User retrieveUserById(int id){
        return this.findUserById(id);
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public void deleteUserById(int id){
        User user = this.findUserById(id);

        userRepository.delete(user);
    }

}
