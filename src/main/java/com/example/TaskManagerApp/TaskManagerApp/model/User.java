package com.example.TaskManagerApp.TaskManagerApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity(name = "user_details")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(min = 3, message = "Minimum number of characters is not reached!")
    @JsonProperty("user_name")
    private String username;

    @Email
    private String email;

    @Size(min = 5, message = "Minimum number of characters is not reached!")
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Board> boards;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<BoardMembers> boardMembers;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Task> tasks;

    protected User(){}

    public User(String email, Integer id, String password, String username) {
        this.email = email;
        this.id = id;
        this.password = password;
        this.username = username;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(List<Board> boards) {
        this.boards = boards;
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
        return "User{" +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
