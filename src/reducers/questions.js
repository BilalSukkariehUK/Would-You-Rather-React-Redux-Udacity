import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SAVE_ANSWER:
      console.log(state)
      return{
        ...state,
        [action.qid]:{
          ...state[action.qid],
          [action.answer]:{
            ...state[action.id],
            text: state[action.qid][action.answer].text,
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
      
    case ADD_QUESTION :
      console.log(action)
      
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}
