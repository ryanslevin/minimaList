package com.ryanslevin.minimalist.DAO;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.ryanslevin.minimalist.Entity.Task;

import org.hibernate.Session;
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
}