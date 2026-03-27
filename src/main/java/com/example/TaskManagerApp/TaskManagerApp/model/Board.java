package com.example.TaskManagerApp.TaskManagerApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private List<BoardMembers> boardMembers;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private List<Task> tasks;

    public Board(String description, Integer id) {
        this.description = description;
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<BoardMembers> getBoardMembers() {
        return boardMembers;
    }

    public void setBoardMembers(List<BoardMembers> boardMembers) {
        this.boardMembers = boardMembers;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Board{" +
                ", id=" + id +
                ", description='" + description + '\'' +
                '}';
    }
}
