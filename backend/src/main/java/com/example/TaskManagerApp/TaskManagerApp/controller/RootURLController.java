package com.example.TaskManagerApp.TaskManagerApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootURLController {

    @GetMapping("/")
    public String returnSomethingToRootURL(){
        return "Root";
    }

}
