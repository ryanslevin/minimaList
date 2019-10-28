import React, { useState, useEffect } from 'react';

import { useAuth0 } from "../react-auth0-spa";

import Container from 'react-bootstrap/Container';

import '../App.css';

import Task from './Task';

const Tasks = () => {

    const { loading, getTokenSilently, user } = useAuth0();

    const [tasks, setTasks] = useState([]);
    const [tasksRetrieved, setTasksRetrieved] = useState(false);

    const getTasks = async () => {

        //Get the authentication token
        const token = await getTokenSilently();

        //Remove "|" from user.sub to prevent encoding error during POST
        const userId = user.sub.replace('|', "");

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
                    setTasks(json);
                }
            ).then(
                setTasksRetrieved(true),
                console.log(tasksRetrieved),
                console.log(tasks)
            );

    };

    useEffect(() => {
        //Check if Auth0 is still loading, and if the tasks have already been retrieved
        if (!loading && !tasksRetrieved) {
            getTasks();
        } else {
        }

    }, [loading, tasksRetrieved, tasks])


    let taskItems = "";

    //If tasksRetrieved = true map the tasks to an array of Task components
    if (tasksRetrieved) {
        taskItems = tasks.map((task) =>
        <Task key={task.id} id={task.id} isComplete={task.isComplete} taskDesc={task.description} />);
    }


    return (
        <Container className='tasks'>
            {taskItems}
        </Container>
    )

}

export default Tasks;