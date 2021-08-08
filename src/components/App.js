import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { handleLoginUser, handleLogoutUser } from '../actions/autheduser'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Login from './Login'

class App extends Component {
  

  constructor() {
    super();
    this.state={
      loggedIn : false
    }
    this.onLogout = this.onLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (e, username) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleLoginUser(username))
    this.setState({
      loggedIn: true
    })
  }

  onLogout = (e) => {
    const { dispatch } = this.props
    dispatch(handleLogoutUser(''))
    this.setState({
      loggedIn: false
    })
  }

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
        return (
            <Router>
                  <Route path='/login' render={(props) => 
                    <Login
                    {...props}
                    users={this.props.users} 
                    handleLogin={this.handleLogin}
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
              {this.state.loggedIn === false
                ?<Redirect to={{
                  pathname: '/login',
                  state: { from: this.props.location}
                }}/>
                :<Redirect to='/home'/>
              }
            </Router>   
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

export default connect(mapStateToProps)(App)
