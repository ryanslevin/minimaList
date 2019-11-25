import React, { useState, useEffect } from "react";

import { useAuth0 } from "../react-auth0-spa";

import Moment from 'react-moment';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faTrashAlt, faEdit, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons"


import "../App.css";

import 'whatwg-fetch';


const Task = props => {

    const { getTokenSilently } = useAuth0();

    let [description, setDescription] = useState(props.taskDesc);
    let [completeByDate, setCompleteByDate] = useState(props.completeByDate);
    let [createdDateTime, setCreatedDateTime] = useState(props.createdDateTime);
    let [isComplete, setIsComplete] = useState(props.isComplete);

    //State for is the task is currently being edited
    let [edit, setEdit] = useState(false);

    const server = "https://api.minimalistapp.com";

    //Get todays date in ISO format to set min for date picker
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        setDescription(props.taskDesc);
    }, [props.taskDesc])

    useEffect(() => {
        setCompleteByDate(props.completeByDate);
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


    const customToggle = React.forwardRef(({ children, onClick }, ref) => (
        <FontAwesomeIcon ref={ref} className="icon options" icon={faEllipsisV}
        onClick={e => {e.preventDefault(); onClick(e);
          }}
        />
      ));


    //Button content for when the task is being displayed and not edited
    let buttonContent =
        <Dropdown>
            <Dropdown.Toggle as={customToggle} id="dropdown-basic">
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEdit(true)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete()}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    let descriptionContent = description;

    let completeByDateContent = ""

    //Check to see if the completeByDate is the default 1970-01-01 or is empty
    //and if true it assigns "-" as the completeByDate content
    if (completeByDate === "1970-01-01" || completeByDate === "") {
        completeByDateContent = "-";
    } else {
        completeByDateContent = <Moment format="YYYY-MM-DD" date={completeByDate} />
    }

    let completeButton = <div className="status-text">In progress</div>
    let completeColumnClass = "task-col in-progress"
    let taskClassName = "task task-in-progress"


    if (isComplete) {
        taskClassName = "task task-complete"
        completeButton = <div className="status-text">Completed</div>
        completeColumnClass = "task-col complete"
    }

    //If the edit state is true
    if (edit) {

        //Text area component that changes the description state on change
        descriptionContent =
                <Form.Control value={description} max="255" onChange={(e) => setDescription(e.target.value)} />

        //Date html element that changes the completeByDate state on change
        completeByDateContent =
                <Form.Control type="date" value={completeByDate} min={today} onChange={(e) => handleCompleteByDateChange(e)} />
        buttonContent =
            <>
                <FontAwesomeIcon className="icon green" icon={faCheck} onClick={() => handleEdit()} />
                <FontAwesomeIcon className="icon red" icon={faTimes} onClick={() => handleCancelEdit()} />
            </>

    }
    return (
        <Container className={taskClassName}>
            <Row>
                <Col xs={12} sm={2} md={2} className={completeColumnClass} onClick={() => handleComplete()}>{completeButton}</Col>
                <Col xs={12} sm={6} md={7} className="task-col">{descriptionContent}</Col>
                <Col xs={8} sm={2} md={2} className="task-col">{completeByDateContent}</Col>
                <Col xs={4} sm={2} md={1} className="task-col">{buttonContent}</Col>
            </Row>
        </Container >
    )

}

export default Task;