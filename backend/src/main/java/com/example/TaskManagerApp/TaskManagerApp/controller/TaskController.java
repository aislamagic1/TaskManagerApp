package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.enums.TaskStatus;
import com.example.TaskManagerApp.TaskManagerApp.model.Task;
import com.example.TaskManagerApp.TaskManagerApp.service.TaskService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/boards/{boardId}/tasks")
    public void createTask(@PathVariable int boardId, Authentication authentication, @RequestBody Task task){
        String username = authentication.getName();
        taskService.createTask(boardId, username, task);
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasksForUser(Authentication authentication){
        String username = authentication.getName();
        return taskService.getAllTasksForUser(username);
    }

    @GetMapping("/boards/{boardId}/tasks")
    public List<Task> getAllTasksForBoard(@PathVariable int boardId){
        return taskService.getAllTasksForBoard(boardId);
    }

    @DeleteMapping("/tasks/{taskId}")
    public void deleteTaskById(@PathVariable int taskId){
        taskService.deleteTaskById(taskId);
    }

    @PatchMapping("/tasks/{taskId}/status")
    public void changeTaskStatusById(@PathVariable int taskId,@RequestBody TaskStatus taskStatus){
        taskService.changeTaskStatusById(taskId, taskStatus);
    }

    @PatchMapping("/tasks/{taskId}")
    public void updateTask(@PathVariable int taskId, @RequestBody Task task){
        taskService.updateTask(taskId, task);
    }

}
