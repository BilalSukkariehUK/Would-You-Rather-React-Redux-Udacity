import React, {Component} from 'react' 
import { connect } from 'react-redux'
import { Card, CardBody,
    CardTitle, Row, Col, CardText, CardHeader, } from 'reactstrap'

class LeaderBoard extends Component{
    

    render(){
        const usersArray = Object.keys(this.props.users).map(k => this.props.users[k])
        let scoredUsersArray = []
        for(let user of usersArray){
            let score = Object.keys(user.answers).length + user.questions.length
            user["score"] = score
            scoredUsersArray.push(user)
        }
        const sortedUsersArray = scoredUsersArray.sort((a,b) => b.score - a.score)
        return(
            <div>
            {sortedUsersArray.map((user) => (
                <Card key={user.id}>
                <CardBody>
                  <Row>
                    <Col sm={3} className='align-self-center' style={{textAlign:"center"}}>
                        <img className='rounded-circle profile-photo' src={user.avatarURL} width='80px' height='80px' alt='user-avatar' />
                    </Col>
                    <Col sm={6} className='align-self-center'>
                      <CardTitle tag="h5">{user.name}</CardTitle>
                        <CardText>
                            Answered question : {Object.keys(user.answers).length}
                        </CardText>
                        <CardText>
                            Created questions : {user.questions.length}
                        </CardText>
                    </Col>
                    <Col sm={3} className='align-self-center' style={{textAlign:"center"}}>
                        <Card>
                            <CardHeader>
                                Score
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    {Object.keys(user.answers).length + user.questions.length}
                                </CardText>
                            </CardBody>
                        </Card>
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

export default connect(mapStateToProps)(LeaderBoard)