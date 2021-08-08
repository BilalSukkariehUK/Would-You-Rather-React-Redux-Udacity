import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody,
    CardTitle, Button, Row, Col, CardText, } from 'reactstrap';



class QuestionsList extends Component{

    render(){
      let questionArray = Object.keys(this.props.questionsList).map(k => this.props.questionsList[k])
      const sortedArray = questionArray.sort((a,b) => b.timestamp - a.timestamp)
        return(
            <div>
                {sortedArray.map((question) => (
                  
                    <Card key={question.id}>
                    <CardHeader> {this.props.users[question.author].name} asks:</CardHeader>
                    <CardBody>
                      <Row>
                          <Col sm={3} className='align-self-center' style={{textAlign:"center"}}>
                            <img className='rounded-circle profile-photo' src={this.props.users[question.author].avatarURL} width='80px' height='80px' alt='user-avatar' />
                            </Col>
                          <Col sm={9}>
                          <CardTitle tag="h5">Would you rather ?</CardTitle>
                            <CardText>
                                {this.props.answered === true
                                    ?`${question.optionOne.text}
                                    Or
                                    ${question.optionTwo.text}`
                                    :`..... ${question.optionOne.text.substring(3,7)} .....`
                                }
                            </CardText>
                            <Link to={`/question/${question.id}`}>
                                <Button color="primary" block>
                                    {this.props.answered === true
                                        ?'View Results'
                                        :'View Question'
                                    }
                                </Button>
                            </Link>
                          </Col>
                      </Row>
                    </CardBody>
                  </Card>
                ))}
            </div>
        )
    }
}

function mapStateToProps (state) {
    const { users } = state
    return{
      users
    }
  }

export default connect(mapStateToProps)(QuestionsList)