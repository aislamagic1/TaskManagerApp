package com.example.TaskManagerApp.TaskManagerApp.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskStatus {
    TODO("TODO"),
    IN_PROGRESS("IN_PROGRESS"),
    DONE("DONE");

    private final String label;

    TaskStatus(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }
}
