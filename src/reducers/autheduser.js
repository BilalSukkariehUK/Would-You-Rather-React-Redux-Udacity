import {LOGIN_USER, LOGOUT_USER} from '../actions/autheduser'

export default function authedUser (state = {}, action) {
    switch(action.type) {
      case LOGIN_USER:
        return{
          ...state,
          id: action.userId
        }
        
      case LOGOUT_USER:
        return {
          ...state,
          id: action.userId
        }
      default :
        return state
    }
  }
  