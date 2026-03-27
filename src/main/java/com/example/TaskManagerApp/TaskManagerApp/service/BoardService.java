package com.example.TaskManagerApp.TaskManagerApp.service;

import com.example.TaskManagerApp.TaskManagerApp.enums.BoardRole;
import com.example.TaskManagerApp.TaskManagerApp.exception.ObjectNotFoundException;
import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import com.example.TaskManagerApp.TaskManagerApp.model.BoardMembers;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.repository.BoardMembersRepository;
import com.example.TaskManagerApp.TaskManagerApp.repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    private final UserService userService;

    private final BoardMembersRepository boardMembersRepository;

    public BoardService(BoardRepository boardRepository, UserService userService, BoardMembersRepository boardMembersRepository) {
        this.boardRepository = boardRepository;
        this.userService = userService;
        this.boardMembersRepository = boardMembersRepository;
    }

    public Board findBoardById(int id){
        return boardRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Board not found"));
    }

    public List<Board> getBoardsForUser(int id){
        User user = userService.findUserById(id);
        List<Board> userBoards = new ArrayList<>();

        user.getBoardMembers().forEach(boardMember -> userBoards.add(this.findBoardById(boardMember.getBoard().getId())));
        return userBoards;
    }

    public void addBoardForUser(int id, Board board){
        User user = userService.findUserById(id);

        boardRepository.save(board);
        BoardMembers newMember = new BoardMembers(user, board, BoardRole.MEMBER);
        boardMembersRepository.save(newMember);
    }

    public List<User> getAllMembersForBoard(int id){
        List<BoardMembers> boardMembers = boardRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Board not found"))
                .getBoardMembers();
        List<User> usersForBoard = new ArrayList<>();

        boardMembers.forEach(boardMember -> usersForBoard.add(userService.findUserById(boardMember.getUser().getId())));
        return usersForBoard;
    }
}
