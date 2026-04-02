package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.enums.TaskStatus;
import com.example.TaskManagerApp.TaskManagerApp.model.Task;
import com.example.TaskManagerApp.TaskManagerApp.service.TaskService;
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
    public void createTask(@PathVariable int boardId, @RequestParam int userId, @RequestBody Task task){
        taskService.createTask(boardId, userId, task);
    }

    @GetMapping("/users/{userId}/tasks")
    public List<Task> getAllTasksForUser(@PathVariable int userId){
        return taskService.getAllTasksForUser(userId);
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

}
