import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import HomeTabs from './HomeTabs'
import Navigation from './Navigation'
import Question from './Question'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import { Redirect } from 'react-router'




class Home extends Component{

    
    render(){
        const authedUser = this.props.authedUser.id
        return( 
            <div>
                {authedUser === undefined
                ?<Redirect to='/'/>
                :<div>
                    <Navigation onLogout={this.props.onLogout} authedUser={this.props.users[authedUser]}/>
                <Container>
                    <Row>
                        <Col md={{size: 8, offset: 2}}>
                        {this.props.fragmentToRender === 'tabs' && 
                        <HomeTabs props={this.props} authedUser={authedUser}/>
                        }
                        {this.props.fragmentToRender === 'add' && 
                        <NewQuestion props={this.props} authedUser={authedUser}/>
                        }
                        {this.props.fragmentToRender === 'leaderboard' && 
                        <LeaderBoard props={this.props} authedUser={authedUser}/>
                        }
                        {this.props.fragmentToRender === 'question' && 
                        <Question props={this.props} authedUser={authedUser}/>
                        }
                        </Col>
                    </Row>
                </Container>   
                </div>}
                      
            </div>
        )
    }
}

function mapStateToProps (state) {
    const { authedUser, users, questions } = state
    return{
      authedUser,
      users,
      questions
    }
    
}

export default connect(mapStateToProps)(Home)