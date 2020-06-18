import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import quiz from './Reducers/quiz-reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers({quiz}),
    composeEnhancers(applyMiddleware(thunk))
)

export default store