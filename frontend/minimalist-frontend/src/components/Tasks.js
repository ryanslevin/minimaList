import React, { useState, useEffect } from 'react';

import { useAuth0 } from "../react-auth0-spa";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import '../App.css';

import Task from './Task';
import NewTask from './NewTask';

const Tasks = () => {

    const { loading, getTokenSilently, user } = useAuth0();

    const [tasks, setTasks] = useState([]);
    const [tasksRetrieved, setTasksRetrieved] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false);

    const getTasks = async () => {

        //Get the authentication token
        const token = await getTokenSilently();

        //Remove "|" from user.sub to prevent encoding error during POST
        const userId = user.sub.replace('|', "");

        setTasksRetrieved(true);

        //GET request to backend, will return a collection of tasks
        const result = await fetch("http://localhost:8080/api/task?userId=" + userId, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //Parse the result and assign to the tasks array
        await result.json()
            .then(
                async json => {
                    setTasks(json)
                    console.log(json)
                }
            )
    };

    useEffect(() => {

        //Check if Auth0 is still loading, and if the tasks have already been retrieved
        if (!loading && !tasksRetrieved) {
            getTasks();
        } else {
        }
    }, [loading, tasksRetrieved, tasks])

    //Passed to tasks and called when they update or delete their content
    const handleUpdateTasks = () => {
        setTasksRetrieved(false);
    }

    let taskItems = [];
    let newTask = "";

    //Called on submission of a new task
    const taskAdded = () => {

        //sets showNewTask to false, which renders the "+" button
        setShowNewTask(false);
        handleUpdateTasks(false);
    }

    const handleCancelNewTask = () => {
        setShowNewTask(false);
    }

    //If tasksRetrieved === true map the tasks to an array of Task components
    if (tasksRetrieved && !loading) {

        taskItems = tasks.map((task) => 
            <Task
                key={task.id}
                id={task.id}
                userId={user.sub.replace('|', "")}
                isComplete={task.isComplete}
                taskDesc={task.description}
                createdDateTime={task.createdDateTime}
                completeByDate={task.completeByDate}
                handleUpdate={() => handleUpdateTasks()}
            />
        );

        newTask = <FontAwesomeIcon className='icon' icon={faPlus} onClick={() => setShowNewTask(true)}/>

        

    }


    if (showNewTask) {
        newTask = <NewTask userId={user.sub.replace('|', "")} onClick={() => taskAdded()} handleCancel={() => handleCancelNewTask()} />
    }

    return (
        <Container className='tasks'>
            {newTask}
            {taskItems}
        </Container>
    )
}

export default Tasks;