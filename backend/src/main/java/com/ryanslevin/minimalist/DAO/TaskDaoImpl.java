package com.ryanslevin.minimalist.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.ryanslevin.minimalist.Entity.Task;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TaskDaoImpl implements TaskDao {

    @Autowired
    EntityManager entityManager;

    @Override
    @Transactional
    public void createTask(Task task) {

        // Unwrap session from EntityManager
        Session session = entityManager.unwrap(Session.class);

        // Save course to db
        session.save(task);
    }

    @Override
    @Transactional
    public List<Task> getTasks(String userId) {

        Session session = entityManager.unwrap(Session.class);

        Query query = session.createQuery("from Task where userId = '"+userId+"'", Task.class);
    
        List<Task> tasks = query.getResultList();

        System.out.println("Getting tasks:"+tasks);

        return tasks;
    }

    @Override
    @Transactional
    public void updateTask(Task task) {

        Session session = entityManager.unwrap(Session.class);
        
        session.update(task);

        System.out.println("Updated task:"+task);
    }

    @Override
    @Transactional
    public void deleteTask(int taskId) {
        
        Session session = entityManager.unwrap(Session.class);

        Query query = session.createQuery("from Task where id = "+taskId, Task.class);

        Task task = (Task) query.getSingleResult();

        session.delete(task);

    }
}