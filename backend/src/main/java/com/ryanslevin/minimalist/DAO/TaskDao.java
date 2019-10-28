package com.ryanslevin.minimalist.DAO;

import java.util.List;

import com.ryanslevin.minimalist.Entity.Task;

public interface TaskDao {
    public void createTask(Task task);

	public List<Task> getTasks(String userId);

	public void updateTask(Task task);

	public void deleteTask(int taskId);
}