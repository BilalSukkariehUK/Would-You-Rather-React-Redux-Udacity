import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Container,
  Row,
  Col,
} from 'reactstrap'
import {NavLink} from 'react-router-dom'

export default function Navigation (props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
    <Container className='nav-container'>
        <Row>
            <Col md={12}>
                <Row>
                    <Col md={8} className="nav-row">
                        <Navbar color="light" light expand="md">
                        
                            <NavLink to='/home' exact className="nav-link nav-brand">Would You Rather</NavLink>
                        
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink to='/add' className="nav-link">Add Question</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to='/leaderboard' className="nav-link">Leader Board</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        </Navbar>
                    </Col>
                    <Col md={4} className="nav-row">
                        <Navbar color="light" light expand="md">
                                <Nav className="ms-auto" navbar>
                                <NavbarText>Hello, {props.authedUser.name} </NavbarText>
                                    <NavItem>
                                        <NavLink to="/"  className='profile-photo-link '><img className='rounded-circle profile-photo nav-link' src={props.authedUser.avatarURL} width='40px' height='40px' alt='username' /></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={props.onLogout} to="/" className="nav-link">Logout</NavLink>
                                    </NavItem>
                                </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    </div>
  )
}