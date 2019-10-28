package com.ryanslevin.minimalist.Controller;

import java.util.List;

import com.ryanslevin.minimalist.Entity.Task;

public interface TaskController {

    public void createTask(Task task);

    public List<Task> getTasks(String userId);

    public void updateTask(Task task);

    public void deleteTask(int taskId);
    
}