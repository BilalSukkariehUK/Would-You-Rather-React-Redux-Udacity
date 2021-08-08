import { Component } from 'react'
import { connect } from 'react-redux'
import {  Redirect, Route, withRouter } from 'react-router-dom'
import { handleLoginUser, handleLogoutUser } from '../actions/autheduser'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Login from './Login'

class App extends Component {
  

  constructor() {
    super();
    this.state={
      loggedIn : false,
      requestedUrl: '/'
    }
    this.onLogout = this.onLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (e, username) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleLoginUser(username))
    if(this.state.requestedUrl === '/'){
      this.setState({
        loggedIn: true
      }, this.props.history.push('/home'))
    }else if(this.state.requestedUrl === '/login'){
      this.setState({
        loggedIn: true
      }, this.props.history.push('/home'))
    }else{
      this.setState({
        loggedIn: true
      }, this.props.history.push(this.state.requestedUrl))
    }
    
  }

  onLogout = (e) => {
    const { dispatch } = this.props
    dispatch(handleLogoutUser(''))
    this.setState({
      loggedIn: false,
      requestedUrl: '/'
    })
  }

  componentDidMount(){
    this.setState(prevState =>({
      ...prevState,
      requestedUrl: this.props.location.pathname
    }))
    this.props.dispatch(handleInitialData())
  }
  render(){
        return (
          <div>
                  <Route path='/login' render={(props) => 
                    <Login
                    {...props}
                    users={this.props.users} 
                    handleLogin={this.handleLogin}
                    requestedUrl={this.state.requestedUrl}
                    />
                  }/>
                  <Route path='/home' render={(props) => 
                    <Home 
                    {...props}
                    onLogout={this.onLogout}
                    fragmentToRender='tabs'
                    />
                  }/>
                    <Route path='/add' render={(props) =>
                      <Home
                        {...props}
                        onLogout={this.onLogout}
                        fragmentToRender='add'
                      />
                    }/>
                    <Route path='/leaderboard' render={(props) =>
                      <Home
                        {...props}
                        onLogout={this.onLogout}
                        fragmentToRender='leaderboard'
                      />
                    }/>
                    <Route path='/question/:id' render={(props) =>
                      <Home
                        {...props}
                        onLogout={this.onLogout}
                        fragmentToRender='question'
                      />
                    }/>
              {!this.state.loggedIn &&
                <Redirect to='/login'/>
              } 
        </div>
      );
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

export default withRouter(connect(mapStateToProps)(App))
