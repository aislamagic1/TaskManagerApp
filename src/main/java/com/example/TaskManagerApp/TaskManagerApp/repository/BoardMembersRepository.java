package com.example.TaskManagerApp.TaskManagerApp.repository;

import com.example.TaskManagerApp.TaskManagerApp.model.BoardMembers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardMembersRepository extends JpaRepository<BoardMembers, Integer> {
}
