import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import QuestionsList from './QuestionsList'
import { connect } from 'react-redux'




class HomeTabs extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
    }

    render(){
        const authedUserObject = this.props.users[this.props.authedUser]
        const questions = this.props.questions
        const authedUserAnsweredQuestionsIds = Object.keys(authedUserObject["answers"])
        let authedUserAnsweredQuestionsObject = {}
        Object.keys(questions).forEach(function(key) {
            if(authedUserAnsweredQuestionsIds.includes(key)){
                authedUserAnsweredQuestionsObject[key] = questions[key]
            }
        });
        let authedUserUnansweredQuestionsObject = {}
        Object.keys(questions).forEach(function(key) {
            if(!authedUserAnsweredQuestionsIds.includes(key)){
                authedUserUnansweredQuestionsObject[key] = questions[key]
            }
        });
        
    
    return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Answered Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Unaswered Questions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm={{size: 10, offset: 1}}>
                  <QuestionsList 
                        questionsList={authedUserAnsweredQuestionsObject}
                        answered={true}
                    />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm={{size: 10, offset: 1}}>
                  <QuestionsList 
                        questionsList={authedUserUnansweredQuestionsObject}
                        answered={false}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      );
}
  
}

function mapStateToProps (state) {
    const { questions, users } = state
    return{
      questions,
      users
    }
  }

export default connect(mapStateToProps)(HomeTabs);