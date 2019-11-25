import React, { useState } from "react";

import { useAuth0 } from "../react-auth0-spa";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

import 'whatwg-fetch';

const NewTask = (props) => {

  //State management
  const [description, setDescription] = useState();
  const [completeByDate, setCompleteByDate] = useState();

  //Function to get Auto0 token, needed for POST call
  const { getTokenSilently } = useAuth0();

  //Get todays date in ISO format to set min for date picker
  const today = new Date();

  const server = "https://api.minimalistapp.com";

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

    await fetch(server + "/api/task", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
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
    <Container className="task">
      <Row>
        <Col xs={12} sm={9} className="task-col">
          <Form.Control className="text-area" placeHolder="Enter your task description here..." onChange={(e) => updateDescription(e)} />
        </Col>
        <Col xs={12} sm={2} className="task-col">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>Choose your task due date</Tooltip>
            }>
            <Form.Control type="date" min={today} onChange={(e) => handleCompleteByDateChange(e)} />
          </OverlayTrigger>
        </Col>
        <Col xs={12} sm={1} className="task-col">
          <FontAwesomeIcon className="icon green" icon={faCheck} onClick={() => handleTaskSubmit()} />
          <FontAwesomeIcon className="icon red" icon={faTimes} onClick={props.handleCancel} />
        </Col>
      </Row>
    </Container>
  )

}

export default NewTask;