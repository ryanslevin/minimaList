import React, { useState, useEffect } from 'react';

import { useAuth0 } from '../react-auth0-spa';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../App.css';


const Task = props => {

    const { getTokenSilently } = useAuth0();

    let status = "Incomplete";
    let [description, setDescription] = useState(props.taskDesc);
    let [edit, setEdit] = useState(false);

    if (props.isComplete) {
        status = "Complete"
    }


    useEffect(() => {

        setDescription(props.taskDesc);

    }, [props.taskDesc])

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
            isComplete: true
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
            isComplete: props.isCompleted
        })

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

    //
    const handleCancelEdit = () => {
        setDescription(props.taskDesc);
        setEdit(false);
    }


    let descriptionContent = description;
    let buttonContent = 
        <Dropdown>
            <Dropdown.Toggle size="sm" variant="outline-dark" id="dropdown-basic">Options</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleComplete(props.id)}>Complete</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(props.id)}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setEdit(true)}>Edit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    if (edit) {
        descriptionContent = <Form.Control value={description} type="text" onChange={(e) => setDescription(e.target.value)} />

        buttonContent = 
            <>
            <Button onClick={() => handleEdit()}>Submit</Button>
            <Button onClick={() => handleCancelEdit()}>Cancel</Button>
            </>
    }

    if (props.isCompleted) {
        status = "Complete"
    }

    return (
        <Container className='task'>
            <Row>
                <Col>{descriptionContent}</Col>
                <Col>{status}</Col>
                <Col>{buttonContent}</Col>
            </Row>
        </Container >
    )

}

export default Task;