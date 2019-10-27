package com.ryanslevin.minimalist.Service;

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
    
}