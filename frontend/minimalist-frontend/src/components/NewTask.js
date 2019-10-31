import React, { useState } from 'react';

import { useAuth0 } from "../react-auth0-spa";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const NewTask = (props) => {

  //State management
  const [description, setDescription] = useState();
  const [completeByDate, setCompleteByDate] = useState();
  
  //Function to get Auto0 token, needed for POST call
  const { getTokenSilently } = useAuth0();

  //Get todays date in ISO format to set min for date picker
  const today = new Date().toISOString().split('T')[0];

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
        <Col xs={12} sm={6} className='task-col align-self-center'>
          <Form.Control className='text-area' as="textarea" rows="1" onChange={(e) => updateDescription(e)} />
        </Col>
        <Col xs={6} sm={3} className='task-col align-self-center'>
          <Form.Control type="date" min={today} onChange={(e) => handleCompleteByDateChange(e)} />
        </Col>
        <Col xs={6} sm={1} className='task-col align-self-center'>
        </Col>
        <Col xs={12} sm={2} className='task-col align-self-center'>
        <FontAwesomeIcon className='icon' icon={faCheckCircle} onClick={() => handleTaskSubmit()}/>
        <FontAwesomeIcon className='icon' icon={faTimesCircle} onClick={props.handleCancel}/>
        </Col>
      </Row>
    </Container>
  )

}

export default NewTask;