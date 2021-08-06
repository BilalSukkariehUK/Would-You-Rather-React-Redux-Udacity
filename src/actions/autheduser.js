import { hideLoading, showLoading } from "react-redux-loading"

export const LOGIN_USER = 'LOGIN_USERS'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(userId){
    return{
        type: LOGIN_USER,
        userId
    }
}

export function logoutUser(userId){
    return{
        type: LOGOUT_USER,
        userId
    }
}

export function handleLoginUser(userId){
    return(dispatch) => {
        dispatch(showLoading())
        dispatch(loginUser(userId))
        dispatch(hideLoading())
    }
}

export function handleLogoutUser(userId){
    return(dispatch) => {
        dispatch(showLoading())
        dispatch(logoutUser(userId))
        dispatch(hideLoading())
    }
}