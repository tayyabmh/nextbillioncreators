import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match, please try again.");
        } else {

            axios.post('http://localhost:5000/signup', {
                email: this.state.email,
                password: this.state.password
            }).then(function (response) {
                console.log(response);
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col/>
                        <Col>
                            <h1>
                                Signup Page
                            </h1>
                        </Col>
                        <Col/>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Re-Enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Re-Enter Password" name="confirmPassword" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    </Col>
                    <Col></Col>
                    </Row>
                </Container>    
            </div>
        )
    }
}

export default Signup;
