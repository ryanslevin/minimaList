import React, { useState, useEffect } from 'react';

import { useAuth0 } from '../react-auth0-spa';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faEllipsisH  } from '@fortawesome/free-solid-svg-icons'

import '../App.css';


const Task = props => {


    //<FontAwesomeIcon icon="coffee" />   import { faCoffee } from '@fortawesome/free-solid-svg-icons'


    const { getTokenSilently } = useAuth0();

    let status = "Incomplete";
    let [description, setDescription] = useState(props.taskDesc);
    let [completeByDate, setCompleteByDate] = useState(new Date(props.completeByDate).toISOString().split("T")[0])
    let [createdDateTime, setCreatedDateTime] = useState(new Date(props.createdDateTime).toISOString().split("T")[0])
    let [isComplete, setIsComplete] = useState(props.isComplete)
    let [edit, setEdit] = useState(false);

    //Get todays date in ISO format to set min for date picker
    const today = new Date().toISOString().split('T')[0];

    if (isComplete) {
        status = "Complete"
    }

    useEffect(() => {
        setDescription(props.taskDesc);
        setCompleteByDate(new Date(props.completeByDate).toISOString().split("T")[0]);
        setIsComplete(props.isComplete);
    }, [props.taskDesc, props.completeByDate, props.isComplete])

    const handleDelete = async (id) => {

        //Get the authentication token
        const token = await getTokenSilently();

        await fetch("http://localhost:8080/api/task?taskId=" + id, {
            method: 'DELETE',
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
            isComplete: true,
            createdDateTime: props.createdDateTime,
            completeByDate: props.completeByDate,
        })

        await fetch("http://localhost:8080/api/task", {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        }).then(
            props.handleUpdate()
        );
    }

    const handleEdit = async () => {

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

        console.log(requestBody);

        await fetch("http://localhost:8080/api/task", {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
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

    let buttonContent = 
        <Dropdown>
            <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic"><FontAwesomeIcon className='icon options' icon={faEllipsisH}/></Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as='button' onClick={() => handleComplete(props.id)}>Complete</Dropdown.Item>
                <Dropdown.Item as='button' onClick={() => handleDelete(props.id)}>Delete</Dropdown.Item>
                <Dropdown.Item as='button' onClick={() => setEdit(true)}>Edit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        let descriptionContent = description;
        let completeByDateContent;

        if (completeByDate === "1970-01-01") {
            completeByDateContent = "-";
        }else {
            completeByDateContent = completeByDate;
        }

    if (edit) {
        descriptionContent = <Form.Control value={description} className='text-area' as="textarea" rows="1" onChange={(e) => setDescription(e.target.value)} />

        completeByDateContent = <Form.Control type="date" value={completeByDate} min={today} onChange={(e) => handleCompleteByDateChange(e)} />

        buttonContent = 
            <>
            <FontAwesomeIcon className='icon' icon={faCheck} onClick={() => handleEdit()}/>
            <FontAwesomeIcon className='icon' icon={faTimes} onClick={() => handleCancelEdit()}/>
            </>

    }

    //Takes the boolean prop and converts to a string for display
    if (props.isCompleted) {
        status = "Complete"
    }

    return (
        <Container className='task'>
            <Row>
                <Col xs={12} sm={6} className='task-col align-self-center'>{descriptionContent}</Col>
                <Col xs={6} sm={3} className='task-col align-self-center'>{completeByDateContent}</Col>
                <Col xs={6} sm={1} className='task-col align-self-center'>{status}</Col>
                <Col xs={12} sm={2} className='task-col align-self-center'>{buttonContent}</Col>
            </Row>
        </Container >
    )

}

export default Task;