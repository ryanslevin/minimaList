package com.ryanslevin.minimalist.Controller;

import java.util.List;

import com.ryanslevin.minimalist.Entity.Task;
import com.ryanslevin.minimalist.Service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="http://localhost:3000")
public class TaskControllerImpl implements TaskController {

    @Autowired
    TaskService taskService;

    @Override
    @PostMapping(value="/task")
    public void createTask(@RequestBody Task task) {
        taskService.createTask(task);
    }

}