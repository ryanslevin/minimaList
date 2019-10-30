import React, { useState } from 'react';

import { useAuth0 } from "../react-auth0-spa";

import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const NewTask = (props) => {

  const [description, setDescription] = useState();
  const [completeByDate, setCompleteByDate] = useState();

  const { getTokenSilently } = useAuth0();

  //Update the descirption when the value of the form changes
  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  //Handles the submission of a new task
  const handleTaskSubmit = async () => {

    //Get the authentication token
    const token = await getTokenSilently();

    const currentDateTime = new Date().toISOString();

    //Populates request body with props and state
    const requestBody = JSON.stringify({
      userId: props.userId,
      description: description,
      isComplete: false,
      createdDateTime: currentDateTime,
      completeByDate: completeByDate
    })

    console.log(requestBody);
    await fetch("http://localhost:8080/api/task", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    //Updates the tasksRetrieved state in Tasks to false
    props.onClick();
  }


  const handleCompleteByDateChange = (e) => {
    setCompleteByDate(e.target.value);
  }

  return (
    <Container className='task'>
      <Row>
        <Col xs={6}>
          <Form.Control type="text" onChange={(e) => updateDescription(e)} />
        </Col>
        <Col xs={3}>
          <Form.Control type="date" onChange={(e) => handleCompleteByDateChange(e)} />
        </Col>
        <Col xs={1}>
        </Col>
        <Col xs={2}>
        <FontAwesomeIcon className='icon green' icon={faCheck} onClick={() => handleTaskSubmit()}/>
        <FontAwesomeIcon className='icon red' icon={faTimes} onClick={props.handleCancel}/>
        </Col>
      </Row>
    </Container>
  )

}

export default NewTask;