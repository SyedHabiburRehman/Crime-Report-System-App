import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/authReducer';
import { ReportReducer } from './reducers/reportReducer';

const middleware = compose(applyMiddleware(thunk));

const rootReducer = combineReducers({
    AuthReducer,
    ReportReducer
});

export const store = createStore(
    rootReducer,
    middleware
)

store.subscribe(()=>{
    console.log("STORE CHANGEED", store.getState())
})