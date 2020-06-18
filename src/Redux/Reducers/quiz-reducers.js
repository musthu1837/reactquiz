import * as QUIZ_ACTION_TYPES  from '../Action-Types/quiz-action-types'

const initialState = {
    questions: [],
    minutes: 0,
    seconds: 0,
    tab: 0,
    fullName: '',
    emailId: ''
}

const quiz = (state = initialState, action) => {
    debugger
    switch(action.type){
        case QUIZ_ACTION_TYPES.FETCH_QUESTIONS:
            return {...state, questions: action.payload, minutes: action.payload.length}
        case QUIZ_ACTION_TYPES.SET_TIME:
            const {minutes, seconds} = action.payload
            return {...state, minutes, seconds}
        case QUIZ_ACTION_TYPES.SET_TAB:
            return {...state, tab: action.payload} 
        case QUIZ_ACTION_TYPES.SET_FULL_NAME:
            return {...state, fullName: action.payload} 
        case QUIZ_ACTION_TYPES.SET_EMAIL_ID:
            return {...state, emailId: action.payload}                                    
        default:
            return state
    }


}

export default quiz