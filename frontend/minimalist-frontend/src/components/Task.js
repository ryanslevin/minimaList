import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import '../App.css';


const Task = props => {

    let status = "Incomplete";
    
    if (props.icCompleted) {
        status = "Complete"
    }

    return (
        <Container className='task'>
            <Row>
                <Col>{props.id}</Col>
                <Col>{props.taskDesc}</Col>
                <Col>{status}</Col>
            </Row>
        </Container>
    )

}

export default Task;