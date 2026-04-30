package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import com.example.TaskManagerApp.TaskManagerApp.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/boards")
    public List<Board> getBoardsForUser(Authentication authentication){
        String username = authentication.getName();
        return boardService.getBoardsForUser(username);
    }

    @PostMapping("/boards")
    public void addBoardForUser(Authentication authentication, @Valid @RequestBody Board board){
        String username = authentication.getName();
        boardService.addBoardForUser(username, board);
    }

    @GetMapping("/boards/{boardId}/members")
    public List<BoardService.MemberResponse> getAllMembersForBoard(@PathVariable int boardId){
        return boardService.getAllMembersForBoard(boardId);
    }

    @PostMapping("/boards/{boardId}/members")
    public void addMemberToBoard(@PathVariable int boardId, @RequestParam int userId){
        boardService.addMemberToBoard(userId, boardId);
    }
}
