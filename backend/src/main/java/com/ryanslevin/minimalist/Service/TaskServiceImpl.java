package com.ryanslevin.minimalist.Service;

import java.util.List;

import com.ryanslevin.minimalist.DAO.TaskDao;
import com.ryanslevin.minimalist.Entity.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    TaskDao taskDao;

    @Override
    public void createTask(Task task) {
        taskDao.createTask(task);
    }

    @Override
    public List<Task> getTasks(String userId) {
        return taskDao.getTasks(userId);
    }

    @Override
    public void updateTask(Task task) {
        taskDao.updateTask(task);
    }

    @Override
    public void deleteTask(int taskId) {
        taskDao.deleteTask(taskId);
    }
    
}