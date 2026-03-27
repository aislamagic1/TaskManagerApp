package com.example.TaskManagerApp.TaskManagerApp.repository;

import com.example.TaskManagerApp.TaskManagerApp.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}
