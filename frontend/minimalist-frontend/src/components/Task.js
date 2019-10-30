import React, { useState, useEffect } from 'react';

import { useAuth0 } from '../react-auth0-spa';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import '../App.css';


const Task = props => {


    //<FontAwesomeIcon icon="coffee" />   import { faCoffee } from '@fortawesome/free-solid-svg-icons'


    const { getTokenSilently } = useAuth0();

    let status = "Incomplete";
    let [description, setDescription] = useState(props.taskDesc);
    let [completeByDate, setCompleteByDate] = useState(new Date(props.completeByDate).toISOString().split("T")[0])
    let [createdDateTime, setCreatedDateTime] = useState(new Date(props.createdDateTime).toISOString().split("T")[0])
    let [edit, setEdit] = useState(false);

    if (props.isComplete) {
        status = "Complete"
    }

    useEffect(() => {
        setDescription(props.taskDesc);
        setCompleteByDate(new Date(props.completeByDate).toISOString().split("T")[0]);
    }, [props.taskDesc, props.completeByDate])

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
                <Dropdown.Item onClick={() => handleComplete(props.id)}>Complete</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(props.id)}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setEdit(true)}>Edit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        let descriptionContent = description;
        let completeByDateContent = completeByDate;

    if (edit) {
        descriptionContent = <Form.Control value={description} type="text" onChange={(e) => setDescription(e.target.value)} />

        completeByDateContent = <Form.Control type="date" value={completeByDate} onChange={(e) => handleCompleteByDateChange(e)} />

        buttonContent = 
            <>
            <FontAwesomeIcon className='icon green' icon={faCheck} onClick={() => handleEdit()}/>
            <FontAwesomeIcon className='icon red' icon={faTimes} onClick={() => handleCancelEdit()}/>
            </>

    }

    if (props.isCompleted) {
        status = "Complete"
    }

    return (
        <Container className='task'>
            <Row>
                <Col xs={6}>{descriptionContent}</Col>
                <Col xs={3}className='complete-by'>{completeByDateContent}</Col>
                <Col xs={1}className='status'>{status}</Col>
                <Col xs={2}className='buttons'>{buttonContent}</Col>
            </Row>
        </Container >
    )

}

export default Task;