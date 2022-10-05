import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./reducers/session_reducer";
import errors from "./reducers/errors_reducer";
import posts from "./reducers/posts_reducer";
import comments from "./reducers/comments_reducer";

// For the entities slice of state
const entitiesReducer = combineReducers({
  posts,
  comments,
});

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors,
  session: sessionReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
