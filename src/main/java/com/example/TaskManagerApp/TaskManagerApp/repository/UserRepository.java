package com.example.TaskManagerApp.TaskManagerApp.repository;

import com.example.TaskManagerApp.TaskManagerApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
    boolean existsByUsername(String username);
}
