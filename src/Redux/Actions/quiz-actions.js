import axios from '../../api'
import * as QUIZ_ACTION_TYPES  from '../Action-Types/quiz-action-types'


export const fetchQuestions = () => async dispatch => {
    const response = await axios.get('questions')
    dispatch({
        payload: response.data,
        type: QUIZ_ACTION_TYPES.FETCH_QUESTIONS
    })
}

export const setTime = (time) => {
    return {
        payload: time,
        type: QUIZ_ACTION_TYPES.SET_TIME
    }
}

export const setTab = (tabIndex) => {
    return {
        payload: tabIndex,
        type: QUIZ_ACTION_TYPES.SET_TAB
    }
}

export const setFullName = (fullName) => {
    return {
        payload: fullName,
        type: QUIZ_ACTION_TYPES.SET_FULL_NAME
    }
}
export const setEmailId = (emailId) => {
    return {
        payload: emailId,
        type: QUIZ_ACTION_TYPES.SET_EMAIL_ID
    }
}