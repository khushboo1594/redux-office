const redux = require("redux");

// creating the store
const createStore = redux.createStore;

// state
const initialValue = {
  loading: false,
  users: [],
  error: "",
};

// actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// action creator
const fetchUserRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};
const fetchUserSuccess = (users) => {
  return { type: FETCH_USERS_SUCCESS, payload: users };
};
const fetchUserFailure = (error) => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};

// reducer
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
