import React, { useState, useEffect } from "react";

import { useAuth0 } from "../react-auth0-spa";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons"
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons"


import "../App.css";


const Task = props => {

    const { getTokenSilently } = useAuth0();

    let [description, setDescription] = useState(props.taskDesc);
    let [completeByDate, setCompleteByDate] = useState(new Date(props.completeByDate).toISOString().split("T")[0])
    let [createdDateTime, setCreatedDateTime] = useState(new Date(props.createdDateTime).toISOString().split("T")[0])
    let [isComplete, setIsComplete] = useState(props.isComplete)

    //State for is the task is currently being edited
    let [edit, setEdit] = useState(false);

    const server = "https://api.minimalistapp.com";

    //Get todays date in ISO format to set min for date picker
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        setDescription(props.taskDesc);
    }, [props.taskDesc])

    useEffect(() => {
        setCompleteByDate(new Date(props.completeByDate).toISOString().split("T")[0]);
    }, [props.completeByDate])


    useEffect(() => {
        setIsComplete(props.isComplete);
    }, [props.isComplete])


    const handleDelete = async () => {

        //Get the authentication token
        const token = await getTokenSilently();

        await fetch(server + "/api/task?taskId=" + props.id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        props.handleUpdate()
    }

    const handleComplete = async () => {

        //Get the authentication token
        const token = await getTokenSilently();

        //Populates request body with props and new isComplete value
        const requestBody = JSON.stringify({
            id: props.id,
            userId: props.userId,
            description: props.taskDesc,
            isComplete: !isComplete,
            createdDateTime: props.createdDateTime,
            completeByDate: props.completeByDate,
        })

        await fetch(server + "/api/task", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: requestBody
        })
        props.handleUpdate()
    }

    const handleEdit = async () => {

        setEdit(false);

        //Get the authentication token
        const token = await getTokenSilently();

        //Populates request body with props and new isComplete value
        const requestBody = JSON.stringify({
            id: props.id,
            userId: props.userId,
            description: description,
            isComplete: props.isComplete,
            createdDateTime: createdDateTime,
            completeByDate: completeByDate,
        })
        await fetch(server + "/api/task", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: requestBody
        });

        //Trigger rerender of Tasks component
        props.handleUpdate();
    }

    const handleCompleteByDateChange = (e) => {
        setCompleteByDate(e.target.value)
    }

    const handleCancelEdit = () => {

        //Sets the description back to the original
        setDescription(props.taskDesc);

        //Changes the text input back into <p>
        setEdit(false);
    }


    //Button content for when the task is being displayed and not edited
    let buttonContent =
        <>
            <OverlayTrigger
                placement="right"
                overlay={
                    <Tooltip>Edit this task</Tooltip>
                }>
                <FontAwesomeIcon className="icon" icon={faEdit} onClick={() => setEdit(true)} />
            </OverlayTrigger>

            <OverlayTrigger
                placement="right"
                overlay={
                    <Tooltip>Delete this task</Tooltip>
                }>
                <FontAwesomeIcon className="icon" icon={faTrashAlt} onClick={() => handleDelete()} />
            </OverlayTrigger>
        </>

    let descriptionContent = description;
    let completeByDateContent;

    //Check to see if the completeByDate is the default 1970-01-01 or is empty
    //and if true it assigns "-" as the completeByDate content
    if (completeByDate === "1970-01-01" || completeByDate === "") {
        completeByDateContent = "-";
    } else {
        completeByDateContent = completeByDate;
    }

    //If the edit state is true
    if (edit) {

        //Text area component that changes the description state on change
        descriptionContent =
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>Enter your task</Tooltip>
                }>
                <Form.Control value={description} className="text-area" max="255" as="textarea" rows="1" onChange={(e) => setDescription(e.target.value)} />
            </OverlayTrigger>

        //Date html element that changes the completeByDate state on change
        completeByDateContent =
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>Choose your task due date</Tooltip>
                }>
                <Form.Control type="date" value={completeByDate} min={today} onChange={(e) => handleCompleteByDateChange(e)} />
            </OverlayTrigger>
        buttonContent =
            <>
                <FontAwesomeIcon className="icon" icon={faCheck} onClick={() => handleEdit()} />
                <FontAwesomeIcon className="icon" icon={faTimes} onClick={() => handleCancelEdit()} />
            </>

    }

    let completeButton =

        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>Complete task</Tooltip>
            }>
            <FontAwesomeIcon className="icon" icon={faSquare} onClick={() => handleComplete()} />
        </OverlayTrigger>
    let taskClassName = "task"

    if (isComplete) {
        taskClassName = "task task-complete"
        completeButton =
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>Uncomplete task</Tooltip>
                }>
                <FontAwesomeIcon className="icon" icon={faCheckSquare} onClick={() => handleComplete()} />
            </OverlayTrigger>
    }

    return (
        <Container className={taskClassName}>
            <Row>
                <Col xs={12} sm={1} className="task-col align-self-center">{completeButton}</Col>
                <Col xs={12} sm={6} className="task-col align-self-center">{descriptionContent}</Col>
                <Col xs={12} sm={3} className="task-col align-self-center">{completeByDateContent}</Col>
                <Col xs={12} sm={2} className="task-col align-self-center">{buttonContent}</Col>
            </Row>
        </Container >
    )

}

export default Task;