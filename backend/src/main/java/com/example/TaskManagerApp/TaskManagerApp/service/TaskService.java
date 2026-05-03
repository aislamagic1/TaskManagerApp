package com.example.TaskManagerApp.TaskManagerApp.service;

import com.example.TaskManagerApp.TaskManagerApp.enums.TaskStatus;
import com.example.TaskManagerApp.TaskManagerApp.exception.ObjectNotFoundException;
import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import com.example.TaskManagerApp.TaskManagerApp.model.Task;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final UserService userService;

    private final BoardService boardService;

    public TaskService(BoardService boardService, TaskRepository taskRepository, UserService userService) {
        this.boardService = boardService;
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    public void createTask(int boardId, String username, Task task){
        Board board = boardService.findBoardById(boardId);
        User creator = userService.getUserRepository().findByUsername(username);

        task.setBoard(board);
        task.setUser(creator);
        task.setStatus(TaskStatus.IN_PROGRESS);
        task.setCreator(creator.getUsername());

        taskRepository.save(task);
    }

    public List<Task> getAllTasksForUser(String username){
        User user = userService.getUserRepository().findByUsername(username);

        return user.getTasks();
    }

    public List<Task> getAllTasksForBoard(int boardId){
        Board board = boardService.findBoardById(boardId);

        return board.getTasks();
    }

    public void deleteTaskById(int taskId){
        taskRepository.deleteById(taskId);
    }

    public void changeTaskStatusById(int taskId, TaskStatus taskStatus){
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ObjectNotFoundException("Task not found"));
        task.setStatus(taskStatus);

        taskRepository.save(task);
    }

}
