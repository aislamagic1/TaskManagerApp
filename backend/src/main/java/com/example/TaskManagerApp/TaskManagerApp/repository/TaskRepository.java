package com.example.TaskManagerApp.TaskManagerApp.repository;

import com.example.TaskManagerApp.TaskManagerApp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
