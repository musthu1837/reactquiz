import * as QUIZ_ACTION_TYPES  from '../../Redux/Action-Types/quiz-action-types'

import * as QUIZ_ACTIONS from '../../Redux/Actions/quiz-actions'
import axios from '../../api';
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    questions: [],
    minutes: 0,
    seconds: 0,
    tab: 0,
    fullName: '',
    emailId: '',
    questionIndex: 0
}

const storeMock= mockStore(initialState);

const axiosMock = new MockAdapter(axios);


describe("test quiz actions", () => {
    test("setTime should return action object with time", () => {
        const time = { minutes: 9, seconds: 56}
        const action = QUIZ_ACTIONS.setTime(time)
        expect(action.payload).toBe(time)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.SET_TIME)
    })


    test("setTab should return action object with tab index", () => {
        const tabIndex = 2
        const action = QUIZ_ACTIONS.setTab(tabIndex)
        expect(action.payload).toBe(tabIndex)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.SET_TAB)
    })

    test("setFullName should return action object with full name", () => {
        const fullName = "Mohammad Musthafa"
        const action = QUIZ_ACTIONS.setFullName(fullName)
        expect(action.payload).toBe(fullName)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.SET_FULL_NAME)
    })

    test("setEmailId should return action object with email id", () => {
        const emailId = "xyz@gmail.com"
        const action = QUIZ_ACTIONS.setEmailId(emailId)
        expect(action.payload).toBe(emailId)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.SET_EMAIL_ID)
    })

    test("updateAnswer should return action object with answerIndex", () => {
        const answerIndex = 1
        const action = QUIZ_ACTIONS.updateAnswer(answerIndex)
        expect(action.payload).toBe(answerIndex)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.UPDATE_ANSWER)
    })

    test("updateQuestionIndex should return action object with questionIndex", () => {
        const questionIndex = 1
        const action = QUIZ_ACTIONS.updateQuestionIndex(questionIndex)
        expect(action.payload).toBe(questionIndex)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.UPDATE_QUESTION_INDEX)
    })

    test("setMark should return action object with mark", () => {
        const mark = true
        const action = QUIZ_ACTIONS.setMark(mark)
        expect(action.payload).toBe(mark)
        expect(action.type).toBe(QUIZ_ACTION_TYPES.SET_MARK)
    })

    test("fetchQuestions should return action object with questions",  () => {
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
        axiosMock
        .onGet("http://localhost:8080/v1/questions")
        .reply(200,questions)

        const expectedResponse = {
            type: QUIZ_ACTION_TYPES.FETCH_QUESTIONS,
            payload: questions
        }
        storeMock
        .dispatch(QUIZ_ACTIONS.fetchQuestions())
        .then(() => {
            const actions = storeMock.getActions()
            expect(actions[0].payload.length).toBe(1)
            expect(actions[0].type).toBe(QUIZ_ACTION_TYPES.FETCH_QUESTIONS)

        })
    })
})