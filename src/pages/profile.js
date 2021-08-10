import React from 'react';
import {
    Container,
    Row,
    Image,
    Col,
    Form, Button
} from 'react-bootstrap';

//TODO: Let people know we currently only support Matic and Ethereum and Metamask

const Profile = ({
    isConnectedToWallet,
    amountToSend,
    activeToken,
    handleTokenChange,
    handleAmountChange,
    isCompatibleNetwork,
    handleSubmit
}) => ( 
            <div>
            <div className="profile-container" >
                
                
                <Container>
                    <Row>
                        <Col>
                <div className = "profileDescription" >
                    <Container >
                        <Row >
                            <Col/>
                            <Col xs={6} className="profile-name-container">
                                <h4>Tayyab Hussain </h4>
                            </Col> 
                            <Col/>
                        </Row> 
                        <Row >
                            <Col/>
                            <Col>
                            <div className="center-image">
                                <Image className="profile-image" src={process.env.PUBLIC_URL + '/IMG_0885.JPG'} />
                                </div>
                            </Col>
                            <Col/> 
                        </Row>
                        <Row >
                            <Col>
                            <div>
                            <ul>
                                <li>
                                    Creator of Tippin' Ain't Easy
                                </li>
                                <li>
                                    Created TAE as a way to learn about Web3, but realized it's value for international creators and wanted to open it up for them.
                                </li>
                                <li>
                                    Goals in life are to increase economic freedom, reduce the effects of climate change, and help humanity become a space-faring civilization.
                                </li>
                            </ul>
                            </div>
                            </Col> 
                        </Row> 
                    </Container> 
                </div>
                </Col>
                <Col>  
                <div className="tip-actions-container">
                    <h3>Support Tayyab Hussain</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTip">
                            <Form.Label>Tip them in Cryptocurrency</Form.Label>
                            <Form.Control as="select" onChange={handleTokenChange} value={activeToken}>
                                <option value="matic">Matic</option>
                                <option value="erc20">DAI</option>
                                <option value="eth">ETH</option>
                            </Form.Control>
                        </Form.Group>
                        {/* TODO: This unfocuses everytime I input a new number */}
                        <Form.Group className="mb-3" controlId="formTipAmount">
                            <Form.Control type="number" placeholder="Enter Tip Amount" value={amountToSend} onChange={handleAmountChange}/>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formNameOptional" aria-describedby="nameHelpBlock">
                            <Form.Control disabled type="text" placeholder="Enter Name or Twitter Handle (Optional)" onChange={this.handleNameChange} />
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="formMessageOptional" aria-describedby="messageHelpBlock">
                            <Form.Control as="textarea" disabled row={4} placeholder="Enter a Message (Optional)" onChange={this.handleMessageChange}/>
                        </Form.Group> */}
                       
                        <Button variant="primary" type="submit" disabled={!(isConnectedToWallet && isCompatibleNetwork)}onClick={(e) => {
                            handleSubmit(e, amountToSend, activeToken)
                        }}>
                            Submit
                        </Button>
                    </Form>
                </div>
                </Col>
                </Row>
                
                </Container>
            </div>
            </div>
        )

export default Profile;