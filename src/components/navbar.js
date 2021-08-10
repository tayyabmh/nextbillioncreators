import React from 'react';
import {
    Navbar, Container, Nav, Button, Badge, Alert
} from 'react-bootstrap';


const NavigationBar = ({ 
    handleConnect, 
    isCompatibleNetwork, 
    isConnectedToWallet,
    network,
    balance,
    account 
}) => (
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href='#home'>Tippin' Ain't Easy</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="/">Home</Nav.Link> */}
                  {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                  {/* <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                  <Nav.Link href="/payment">Payment</Nav.Link> */}
                </Nav>
                <Nav>
                    {
                        isConnectedToWallet && isCompatibleNetwork ?
                        <span><h5><Badge className="wallet-badge network" bg="warning" pill>Network: {network}</Badge></h5></span>
                        :
                        null
                    }
                    {
                        isConnectedToWallet && isCompatibleNetwork ?
                        <span><h5><Badge className="wallet-badge account" bg="primary" pill>{account}</Badge></h5></span>
                        :
                        null
                    }{
                        isConnectedToWallet && isCompatibleNetwork ?
                        <span><h5><Badge className="wallet-badge balance" bg="info" pill>{balance} ETH</Badge></h5></span>
                        : 
                        null
                    }
                    {
                        isConnectedToWallet ?
                        null :
                        <Button variant="primary" className="connect-wallet" onClick={handleConnect} >Connect Wallet</Button>
                    }
                    {
                        isConnectedToWallet && !isCompatibleNetwork ?
                        <Alert key="incompatible-network" variant='danger'>
                            This network is currently not supported. Please switch to an Ethereum or Matic/Polygon chain.
                        </Alert> :
                        null
                    }
                    {/* { this.state.isPublicURL ? 
                        null :
                        <Button variant="secondary" className="logout-button" disabled={!this.state.isLoggedIn}>Logout</Button>
                    } */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );

export default NavigationBar;