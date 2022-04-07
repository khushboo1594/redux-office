// import redux from 'redux'; // if it were a react application. since this a simple node js application. we will have to require the file
// imported files
const redux = require("redux");
const reduxLogger = require("redux-logger");

// creating the store
const createStore = redux.createStore;

// creating the logger
const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers;

// applying the middleware
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = "BUY_CAKE"; // follow this nomenclature for naming actions
const BUY_ICECREAM = "BUY_ICECREAM";

// creating an action creator : it is what it is, a function for creating action. it is a function that returns a function.
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
  };
}

// state of the application
// const initialState = {
//   numberOfCakes: 10,
//   //   adding 2nd state
//   numberOfIcecreams: 20,
// };

// making different objects for different states
const initialCakeState = {
  numberOfCakes: 10,
};
const initialIcecreamState = {
  numberOfIcecreams: 20,
};
// reducer function
// (prevState, action) => newState
// here we have created only one reducer function, for now it's fine but as the state will keep expanding this reducer function will keep getting bigger and then it will become difficult for us to debug or manage the code.
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numberOfCakes: state.numberOfCakes - 1,
//       };
//     // now what happens in real life a state can have more than one object so always copy the state by spread operator. we are telling react to make a copy of state and then only update numberOfCakes in it.
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numberOfIcecreams: state.numberOfIcecreams - 1,
//       };
//     default:
//       return state;
//   }
// };

// cake reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};

// ice-cream reducer
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };
    default:
      return state;
  }
};

// combining reducers
// it is a norm to call combined reducers as root reducers
// function returned by combine reducers accepts a  object as argument
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});
// ***** execution #1 *****
// holding the application's state
// const store = createStore(reducer);
// const store = createStore(rootReducer);
// createStore takes 2 arguments one reducer another middleware (if any). you  can pass any number of middleware
const store = createStore(rootReducer, applyMiddleware(logger));
// console.log("initial state:", store.getState());

// registering the listener
const unsubscribe = store.subscribe(() => {
  // i am removing the log statements as we a middleware - logger
  //   console.log("updated state", store.getState());
});

// allows state to be updated via dispatch(action)
// yaha par aake reducer ko pata chalta k BUY_CAKE action dispatch karna hai
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

// output in case of single reducer
/*initial state: { numberOfCakes: 10, numberOfIcecreams: 20 }
updated state { numberOfCakes: 9, numberOfIcecreams: 20 }
updated state { numberOfCakes: 8, numberOfIcecreams: 20 }
updated state { numberOfCakes: 7, numberOfIcecreams: 20 }
updated state { numberOfCakes: 7, numberOfIcecreams: 19 }
updated state { numberOfCakes: 7, numberOfIcecreams: 18 }*/

// output in case of combining the reducers
/*initial state: { cake: { numberOfCakes: 10 }, icecrean: { numberOfIcecreams: 20 } }
updated state { cake: { numberOfCakes: 9 }, icecrean: { numberOfIcecreams: 20 } }
updated state { cake: { numberOfCakes: 8 }, icecrean: { numberOfIcecreams: 20 } }
updated state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 20 } }
updated state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 19 } }
updated state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 18 } }*/

// output on putting logger
/*
 action BUY_CAKE @ 17:15:31.578
   prev state { cake: { numberOfCakes: 10 }, icecrean: { numberOfIcecreams: 20 } }
   action     { type: 'BUY_CAKE', info: 'first redux action' }
   next state { cake: { numberOfCakes: 9 }, icecrean: { numberOfIcecreams: 20 } }
 action BUY_CAKE @ 17:15:31.586
   prev state { cake: { numberOfCakes: 9 }, icecrean: { numberOfIcecreams: 20 } }
   action     { type: 'BUY_CAKE', info: 'first redux action' }
   next state { cake: { numberOfCakes: 8 }, icecrean: { numberOfIcecreams: 20 } }
 action BUY_CAKE @ 17:15:31.587
   prev state { cake: { numberOfCakes: 8 }, icecrean: { numberOfIcecreams: 20 } }
   action     { type: 'BUY_CAKE', info: 'first redux action' }
   next state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 20 } }
 action BUY_ICECREAM @ 17:15:31.589
   prev state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 20 } }
   action     { type: 'BUY_ICECREAM' }
   next state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 19 } }
 action BUY_ICECREAM @ 17:15:31.590
   prev state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 19 } }
   action     { type: 'BUY_ICECREAM' }
   next state { cake: { numberOfCakes: 7 }, icecrean: { numberOfIcecreams: 18 } }
*/
// unsubscribing
unsubscribe();
