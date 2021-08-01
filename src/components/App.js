import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Login from './Login'

class App extends Component {

  constructor() {
    super();
    this.state = {
      authedUser: localStorage.getItem('authedUser') ? localStorage.getItem('authedUser') : ''
    }
    this.onLogout = this.onLogout.bind(this);
  }

  handleSelect = (e) => {
    e.preventDefault()
    localStorage.setItem('authedUser', e.target.value);
    this.setState({
      authedUser: e.target.value
    })
  }

  onLogout(){
    localStorage.setItem('authedUser', '');
    this.setState({
      authedUser: ''
    })
  }

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
        return (
          <div>
            <Router>  
                  <Route path='/login' component={(props) => 
                    <Login
                    {...props}
                    users={this.props.users} 
                    handleSelect={this.handleSelect}
                    />
                  }/>
                  <Route path='/home' component={(props) =>
                      <Home
                        {...props}
                        authedUser={this.state.authedUser}
                        onLogout={this.onLogout}
                        fragmentToRender='tabs'
                      />
                  }/>
                    <Route path='/new' component={(props) =>
                      <Home
                        {...props}
                        authedUser={this.state.authedUser}
                        onLogout={this.onLogout}
                        fragmentToRender='new'
                      />
                    }/>
                    <Route path='/leaders' component={(props) =>
                      <Home
                        {...props}
                        authedUser={this.state.authedUser}
                        onLogout={this.onLogout}
                        fragmentToRender='leaders'
                      />
                    }/>
                    <Route path='/question/:id' component={(props) =>
                      <Home
                        {...props}
                        authedUser={this.state.authedUser}
                        onLogout={this.onLogout}
                        fragmentToRender='question'
                      />
                    }/>
              {this.state.authedUser === ''
                ?<Redirect to='/login'/>
                :<Redirect to='/home'/>
              }
            </Router> 
              
          </div>
          
      );
  }
}

function mapStateToProps (state) {
  const { users, questions } = state
  return{
    users,
    questions
  }
}

export default connect(mapStateToProps)(App)
