import {_getUsers, _getQuestions} from '../utils/_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([
            _getUsers(),
            _getQuestions()
        ]).then(([ users, questions ]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
    
}