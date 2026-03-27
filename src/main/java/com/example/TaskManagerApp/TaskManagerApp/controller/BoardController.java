package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BoardController {

    private BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("api/users/{id}/boards")
    public List<Board> getBoardsForUser(@PathVariable int id){
        return boardService.getBoardsForUser(id);
    }

    @PostMapping("api/users/{id}/boards")
    public void addBoardForUser(@PathVariable int id, @Valid @RequestBody Board board){
        boardService.addBoardForUser(id, board);
    }

    @GetMapping("api/boards/{id}/members")
    public List<User> getAllMembersForBoard(@PathVariable int id){
        return boardService.getAllMembersForBoard(id);
    }

}
