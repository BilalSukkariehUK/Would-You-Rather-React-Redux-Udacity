import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, CardHeader, CardBody,
    CardTitle, Button, Container, Row, Col, Form, FormGroup, Input} from 'reactstrap';
import { handleAddQuestion } from "../actions/questions";


class NewQuestion extends Component{

    constructor() {
        super();
        this.state = {
            optionOne: '',
            optionTwo: ''
        };
        this.onOptionOneChange = this.onOptionOneChange.bind(this);
        this.onOptionTwoChange = this.onOptionTwoChange.bind(this);
      }
    
    onOptionOneChange(event) {
        this.setState((prevState) => ({
            ...prevState,
            optionOne: event.target.value
        }))
    }
    
    onOptionTwoChange(event) {
        this.setState((prevState) => ({
            ...prevState,
            optionTwo: event.target.value
        }))
    }

    handleAddQuestion = (e) => {
    const {dispatch, authedUser} = this.props
    e.preventDefault()
    dispatch(handleAddQuestion({
        author: authedUser,
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo
    }))
    

    }

    render(){
        return(
            <Container>
            <Row>
                <Col md={{size: 10, offset: 1}}>
            <Card>
                <CardHeader> 
                    Please type in two options to add a new question        
                </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm={12}>
                                <CardTitle tag="h5">Would you rather ?</CardTitle>
                                <Form onSubmit={this.handleAddQuestion}>
                                    <FormGroup>
                                        <Input type="text" name="optionOne" id="optionOne" placeholder="type in option one" onChange={this.onOptionOneChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" name="optionTwo" id="optionTwo" placeholder="type in option two" onChange={this.onOptionTwoChange}/>
                                    </FormGroup>
                                    <Button color="primary" block type='submit'
                                    disabled={this.state.optionOne === '' || this.state.optionTwo === ''} >
                                        Add Question
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
            </Card>
            </Col>
            </Row>
        </Container>
        
        )
    }
}

function mapStateToProps (state) {
    const { users, questions } = state
    return{
      users,
      questions
    }
}

export default connect(mapStateToProps)(NewQuestion)