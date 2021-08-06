import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class Login extends Component{

  state={
    username: ''
  }

  handleSelect = (e) => {
    e.preventDefault()
    this.setState({
      username: e.target.value
    })
  }
    render(){
        return(
            <div>
            <Fragment>
                <LoadingBar />
                <Container>
                  <Row >
                    <Col className='align-self-center' sm={{size: 4, offset: 4}}>
                    <div className="d-grid">
                    <h5>Welcome to would you rather !</h5>
                    <Form onSubmit={(e) => this.props.handleLogin(e, this.state.username)}>
                      <FormGroup>
                        <Label for="usernameSelect">Pelect Your Username</Label>
                        <Input onChange={this.handleSelect} value={this.props.authedUser} type="select" name="selectMulti" id="usernameSelect">
                          <option value='select'>Please Select Your Username</option>
                          {Object.keys(this.props.users).map(k => this.props.users[k]).map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                          ))}
                        </Input>
                        <Button color='primary' block type='submit'>Submit</Button>
                      </FormGroup>
                    </Form>
                    </div>
                    </Col>
                  </Row>
                </Container>
              </Fragment>
              </div>
        )
    }
}

export default connect()(Login)