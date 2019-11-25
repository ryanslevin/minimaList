import React, { useState, useEffect } from "react";

import { useAuth0 } from "../react-auth0-spa";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

import Task from "./Task";
import NewTask from "./NewTask";

import 'whatwg-fetch'; 

const Tasks = () => {

    const { loading, getTokenSilently, user } = useAuth0();

    const [tasks, setTasks] = useState([]);
    const [showNewTask, setShowNewTask] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);
    const [tasksRetrieved, setTasksRetrieved] = useState(false);
    const [taskComponents, setTaskComponents] = useState([]);

    const server = "https://api.minimalistapp.com";


    useEffect(() => {
        //Check if Auth0 is still loading, and if the tasks have already been retrieved
        if (!loading && !tasksRetrieved) {
            getTasks();
        } else {
        }
    }, [loading, tasksRetrieved, tasks])

    useEffect(() => {

        if (!loading) {
            handleRenderTasks();
        }

    }, [tasks, showCompleted])

    const getTasks = async () => {

        //Get the authentication token
        const token = await getTokenSilently();

        //Remove "|" from user.sub to prevent encoding error during POST
        const userId = user.sub.replace("|", "");

        setTasksRetrieved(true);

        //GET request to backend, will return a collection of tasks
        await fetch(server + "/api/task?userId=" + userId, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            response => response.json())
            .then(async json => {
                await setTasks(json)
            }
            )
    };

    let newTask = "";

    const handleRenderTasks = async () => {

        setTaskComponents([])

        //Iterates through the task item
        tasks.map((task) => {

            //If showCompleted is true, assigns all tasks to taskItems
            if (showCompleted) {

                setTaskComponents(taskComponents => [...taskComponents,
                <Task
                    key={task.id}
                    id={task.id}
                    userId={user.sub.replace("|", "")}
                    isComplete={task.isComplete}
                    taskDesc={task.description}
                    createdDateTime={task.createdDateTime}
                    completeByDate={task.completeByDate}
                    handleUpdate={() => handleUpdateTasks()}
                />
                ]
                )

            } else {

                //If showCompleted is false, assigns all incomplete tasks to taskItems
                if (!task.isComplete) {

                    setTaskComponents(taskComponents => [...taskComponents,
                    <Task
                        key={task.id}
                        id={task.id}
                        userId={user.sub.replace("|", "")}
                        isComplete={task.isComplete}
                        taskDesc={task.description}
                        createdDateTime={task.createdDateTime}
                        completeByDate={task.completeByDate}
                        handleUpdate={() => handleUpdateTasks()}
                    />
                    ]
                    )
                }
            }
        }
        )

    }

    //Passed to tasks and called when they update or delete their content
    const handleUpdateTasks = () => {
        setTasksRetrieved(false);
    }


    //Called on submission of a new task
    const taskAdded = () => {
        //sets showNewTask to false, which renders the "+" button
        setShowNewTask(false);
        setTasksRetrieved(false);
    }

    const handleCancelNewTask = () => {
        setShowNewTask(false);
    }

    //If tasksRetrieved === true map the tasks to an array of Task components
    if (!loading && user) {
        newTask =
                <FontAwesomeIcon className="icon icon-light icon-add-task" icon={faPlus} onClick={() => handleShowNewTask()} />

    }

    const handleShowNewTask = () => {
        setShowNewTask(true);
    }

    let filter;

    if (tasks.length > 0) {
        if (showCompleted) {
            filter =
                <Row>
                    <Col className="show-complete-button" xs={12}>
                            <Button variant="outline-light" onClick={() => setShowCompleted(false) }>Hide completed tasks</Button>
                    </Col>
                </Row>
        } else {
            filter =
                <Row>
                    <Col className="show-complete-button" xs={12}>
                            <Button variant="outline-light" onClick={() => setShowCompleted(true) }>Show completed tasks</Button>
                    </Col>

                </Row>
        }
    }

    if (showNewTask) {
        newTask =
            <NewTask userId={user.sub.replace("|", "")} onClick={() => taskAdded()} handleCancel={() => handleCancelNewTask()} />
    }

    return (
        <Container className="tasks">
            {filter}
            {newTask}
            {taskComponents}
        </Container>
    )
}

export default Tasks;