import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Card, CardHeader, CardBody,
    CardTitle, Button, Container, Row, Col, Form, FormGroup, Input, Label, Progress, CardText } from 'reactstrap';
import { handleSaveAnswer } from '../actions/questions';


class Question extends Component {

    constructor() {
        super();
        this.state = {
          selectedVote: ''
        };
        this.onChangeValue = this.onChangeValue.bind(this);
      }
    
    onChangeValue(event) {
    this.setState({
        selectedVote: event.target.value
    })
    }

    handleAnswer = (e) => {
        console.log(this.props)
    const {dispatch, authedUser, id} = this.props
    e.preventDefault()
    dispatch(handleSaveAnswer({
        authedUser: authedUser,
        qid: id,
        answer: this.state.selectedVote
    }))

    }

    render(){
    const authedUser = this.props.authedUser
    const questionId = this.props.id
    const questionObject = this.props.questions[questionId]
    const isAnswered = Object.keys(this.props.users[authedUser].answers).includes(questionId)
    let totalVotes = 0
    let optionOneVotes = 0
    let optionTwoVotes = 0
    let optionOneVotesPercentage = 0
    let optionTwoVotesPercentage = 0
    if(isAnswered){
        optionOneVotes = questionObject.optionOne.votes.length
        optionTwoVotes = questionObject.optionTwo.votes.length
        totalVotes = optionOneVotes + optionTwoVotes
        optionOneVotesPercentage = optionOneVotes / totalVotes * 100
        optionTwoVotesPercentage = optionTwoVotes / totalVotes * 100
    }
    
    
  return (
        
        <Container>
            {Object.keys(this.props.questions).includes(questionId) 
            ?<Row>
            <Col md={{size: 10, offset: 1}}>
                <Card key={questionId}>
                    <CardHeader> 
                        {isAnswered === true 
                            ?`Asked by ${this.props.users[questionObject.author].name} :`
                            :`${this.props.users[questionObject.author].name} asks :`
                        }
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm={3} className='align-self-center' style={{textAlign:"center"}}>
                            <img className='rounded-circle profile-photo' src={this.props.users[questionObject.author].avatarURL} width='80px' height='80px' alt='username' />
                            </Col>
                            <Col sm={9}>
                            {!isAnswered &&
                            <div>
                                <CardTitle tag="h5">Would you rather ?</CardTitle>
                                <Form>
                                    <div onChange={this.onChangeValue}>
                                    <FormGroup check>
                                        <Label check>
                                        <Input type="radio" name="voteoption" id={questionObject.optionOne.text} value="optionOne" />
                                        {questionObject.optionOne.text}
                                        </Label>
                                        <Label check>
                                        <Input type="radio" name="voteoption" id={questionObject.optionTwo.text} value="optionTwo" />
                                        {questionObject.optionTwo.text}
                                        </Label>
                                    </FormGroup>
                                    </div>
                                <Button color="primary" block onClick={this.handleAnswer}>Submit</Button>
                                </Form>
                            </div>
                            }
                            {isAnswered &&
                            <div>
                                <CardTitle tag="h3">Results</CardTitle>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Would you rather {questionObject.optionOne.text} ?</CardTitle>
                                        <Progress value={optionOneVotesPercentage}>
                                            {optionOneVotesPercentage}%
                                        </Progress>
                                        <CardText style={{textAlign:'center'}}>{optionOneVotes} out of {totalVotes} Votes</CardText>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Would you rather {questionObject.optionTwo.text} ?</CardTitle>
                                        <Progress value={optionTwoVotesPercentage}>
                                            {optionTwoVotesPercentage}%
                                        </Progress>
                                        <CardText style={{textAlign:'center'}}>{optionTwoVotes} out of {totalVotes} Votes</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                            }
                            
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
            :<Row>
                <h1>ooops there is no question here ! </h1>
            </Row>
            }
            
        </Container>
  )
    }
}

function mapStateToProps(state, props){
    const { id } = props.match.params
    const { questions, users }  = state
    return{
        id,
        questions,
        users
    }
}


export default withRouter(connect(mapStateToProps)(Question))