import React, { useState } from 'react';

import { useAuth0 } from "../react-auth0-spa";

import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const NewTask = (props) => {

  const [description, setDescription] = useState();

  const { getTokenSilently } = useAuth0();

  //Update the descirption when the value of the form changes
  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  //Handles the submission of a new task
  const handleTaskSubmit = async () => {

    //Get the authentication token
    const token = await getTokenSilently();

    //Populates request body with props and state
    const requestBody = JSON.stringify({
      userId: props.userId,
      description: description,
      isComplete: false
    })
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

  return (
    <Container className='task'>
      <Row>
        <Col>
          <Form.Control type="text" onChange={(e) => updateDescription(e)} />
        </Col>
        <Col></Col>
        <Col>
          <Button size="sm" variant="outline-success" onClick={() => handleTaskSubmit()}>
            Submit
          </Button>
        </Col>
        <Col>
        <Button size="sm" variant="outline-danger" onClick={props.handleCancel}>
            x
        </Button>
        </Col>
      </Row>
    </Container>
  )

}

export default NewTask;