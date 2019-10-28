package com.ryanslevin.minimalist.Service;

import java.util.List;

import com.ryanslevin.minimalist.Entity.Task;

public interface TaskService {
    public void createTask(Task task);

	public List<Task> getTasks(String userId);
}