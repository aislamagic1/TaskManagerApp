package com.example.TaskManagerApp.TaskManagerApp.service;

import com.example.TaskManagerApp.TaskManagerApp.exception.UserNotFoundException;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User findUserById(int id){
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty())
            throw new UserNotFoundException("id:"+id);

        return user.get();
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public void deleteUserById(int id){
        if(userRepository.findById(id).isEmpty())
            throw new UserNotFoundException("id:"+id);

        userRepository.deleteById(id);
    }

}
