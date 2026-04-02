package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import com.example.TaskManagerApp.TaskManagerApp.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/users/{id}/boards")
    public List<Board> getBoardsForUser(@PathVariable int id){
        return boardService.getBoardsForUser(id);
    }

    @PostMapping("/users/{id}/boards")
    public void addBoardForUser(@PathVariable int id, @Valid @RequestBody Board board){
        boardService.addBoardForUser(id, board);
    }

    @GetMapping("/boards/{id}/members")
    public List<BoardService.MemberResponse> getAllMembersForBoard(@PathVariable int id){
        return boardService.getAllMembersForBoard(id);
    }

    @PostMapping("/boards/{boardId}/members")
    public void addMemberToBoard(@PathVariable int boardId, @RequestParam int userId){
        boardService.addMemberToBoard(userId, boardId);
    }
}
