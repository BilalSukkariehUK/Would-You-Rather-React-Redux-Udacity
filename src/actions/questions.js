import {_getUsers, _saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from '../actions/users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveAnswer({authedUser, qid, answer}){
    return{
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question){
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(question)
          .then((q) => {
            dispatch(addQuestion(q))
            dispatch(hideLoading())
            alert('Question Added !')
          })
          .catch((e) => {
            dispatch(hideLoading())
            alert('An error occured while adding your question, please try again !')
          })
      }
}

export function handleSaveAnswer(answer){
    return (dispatch) => {
        
        dispatch(showLoading())
        dispatch(saveAnswer(answer))
        return Promise.all([
            _saveQuestionAnswer(answer),
            _getUsers()
        ])
        .then(([ questions, users ]) => {
            console.log(users)
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
            dispatch(hideLoading())
        })
        .catch((e) => {
            console.warn('Error in handleSaveAnswer: ', e)
            dispatch(hideLoading())
            alert('An error occured while saving your answer, please try again !')
        })
    }
}
