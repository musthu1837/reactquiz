import * as QUIZ_ACTION_TYPES  from '../../Redux/Action-Types/quiz-action-types'
import quizReducer from '../../Redux/Reducers/quiz-reducers'

const initialState = {
    questions: [],
    minutes: 0,
    seconds: 0,
    tab: 0,
    fullName: '',
    emailId: '',
    questionIndex: 0
}

const questions = [
    {
      "question": "What is the scientific name of a butterfly?",
      "answers": [
        "Apis",
        "Coleoptera",
        "Formicidae",
        "Rhopalocera"
      ],
      "correctIndex": 3,
      "marks": 1,
      "marked": false
    }
]

describe("test quiz reducer", () => {
    test("should return default state", () => {
        const state = quizReducer(initialState,{type: "DEFAULT", payload: null})
        expect(state).toBe(initialState)
    })

    test("should return state with questions array", () => {
        const state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.FETCH_QUESTIONS, payload: questions})
        expect(state.questions.length).toBe(1)
    })

    test("should return state with tab index", () => {
        const state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.SET_TAB, payload: 1})
        expect(state.tab).toBe(1)
    })


    test("should return state with full name", () => {
        const fullName = "Mohammad Musthafa"
        const state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.SET_FULL_NAME, payload: fullName})
        expect(state.fullName).toBe(fullName)
    })

    test("should return state with email address", () => {
        const emailId = "xyz@gmail.com"
        const state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.SET_EMAIL_ID, payload: emailId})
        expect(state.emailId).toBe(emailId)
    })

    test("should update question index", () => {
        const state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.UPDATE_QUESTION_INDEX, payload: 0})
        expect(state.questionIndex).toBe(0)
    })  

    test("should update question answer", () => {
        const questionIndex = 0, answerIndex = 1;

        let state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.FETCH_QUESTIONS, payload: questions})
        expect(state.questions.length).toBe(1)
        
        state = quizReducer({...state},{type: QUIZ_ACTION_TYPES.UPDATE_ANSWER, payload: answerIndex})
        expect(state.questions[questionIndex].answeredIndex).toBe(answerIndex)

    })  

    test("should update question mark", () => {
        const questionIndex = 0, marked = true;

        let state = quizReducer(initialState,{type: QUIZ_ACTION_TYPES.FETCH_QUESTIONS, payload: questions})
        expect(state.questions.length).toBe(1)
        
        state = quizReducer({...state},{type: QUIZ_ACTION_TYPES.SET_MARK, payload: marked})
        expect(state.questions[questionIndex].marked).toBe(marked)

    }) 

})