# INTRODUCTION //////////////////////////////////////////////////////////

**it is a predictable state container for js apps**
let's break it down -

- it is for js apps
- it is a state container
- it is predictable

**it is for js apps**
redux is not tied to react
can be used with react, angular, vue or evn vanilla js
redux is a library for js applications

**it is a state container**
it just means that it stores the state of your application
consider a react app. it has 2 components called LoginFormComponent and UserListComponent
export class LoginFormComponent extends Component {
    constructor(props) {
        super(props)
            this.state = {
            username:'',
            password:'',
            submitting:false
        }
    }
    render() {
    return (
        <div>LoginFormComponent</div>
    )
    }
}

export class UserListComponent extends Component {
    constructor(props) {
        super(props)
            this.state = {
            users:[]
        }
    }
    render() {
        return (
            <div>UserListComponent</div>
        )
    }
}

so the state of an app is represented by all the individual components of that app.

aur agar application ki baat kare to application ki state hogi -
Application{
    state = {
        isUserLoggedIn: true,
        username:'',
        profileURL:'',
        onlineUsers:[],
        isModalOpenend:false
    }
}

the state of whole the application is maintianed by redux.

**it is predictable**
the question arises? predictable in what way?
redux is a state container, right?
the state of the application can change. Ex: todo list app - item (pending) -> item (completed). in a to-so list app an item's state can change from pending to completed.
in redux, all state transitions are explicit and it is possible to keep track of them or in other words the changes to your application's state become predictable

**why do we want to use redux**
if you want to manage your application's state in a predictable way then go for redux.

**react + redux**
now you must be wondering why do we would want to use redux with react when in react every component has it's own state. then why we would need a tools for that.

(https://youtu.be/9boMnm5X9ak?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK&t=472)suppose you have a big application and you have a state called name at the very end of the tree. now what if you have want that state a level higher in the component tree, you will lift the state up that's easy,now lets make it more complicated suppose you want the name state in a different branch only. then you will have to life the whole state up to the top component and send it down as props down the tree. that's hectic and some components will be getting uncessary information also.
for solving this problem we use REDUX. now you must be thinking is this really a problem we have **_context_** and **_useContext and useReducer hook_** for that which prevents **_prop drilling_**. still why do we use redux we will get to it in a momment.
in redux we have a state container outside the app. if any component needs any state it will communicate with the state container. and our problem will be solved.

**is the above stated scenerio, really a problem? we have context, useContext and useReducer hook for preventing prop drilling then why**
the answer is redux v1.0 was intoduced in 2015 when these were not introduced. these were introduced in react v16.8 in 2019.

**react redux library**
react is a UI library. redux is a state managment library. they both work independtly. now using redux with react would have been a very difficult task, so we a library called react redux library.
react redux library provides binding to use react and redux together in an application
**_it is the official redux UI binding library for react_**

**when should you use redux in your application**
when you are struggling with maintaining the state in your application. ask yourself whether it is adding any value to the project or not. when you have many components in your application which requires to share state and it becomes difficult for you to maintain the state.

**redux can work independently without react**

# GETTING STARTED ///////////////////////////////////////////////////////

- npm init --yes
  this will initialize a package.json file along with the default settings dependency

- next step will be to add **_redux_** as your dependency so
  npm install redux
  it will add this -
  "dependencies": {
  "redux": "^4.1.2"
  }
  to your package.json file

- create a js file

# THREE CORE CONCEPTS ///////////////////////////////////////////////////

there is a cake shop. the **_entities_** will be -

- shop itself - stores cakes on a shelf
- shopkeeper - at the front of the store
- customer- at the store entrance
  suppose you are the customer and you went to this cake shop and let the shopkeeper know that you want to buy the cake. you never go behind the counter, take the cake by yourself, keep the cash and go. sue you can do this but this is the shopkeeper's work. he is there to follow a process for you to purchase the cake. when you make a request he will first check whether the cake is available then deduct one cake from it's inventory, print a bill for you, box the cake and give it you. you then take the cake home

**_activities_**

- customer - buy a cake
- shopkeeper - remove the cake from the shelf - receipt to keep track

now, how is this related to the redux
**_cake shop_** **_redux_** **_purpose_**

- shop store holds the state of your application
- intension to buy the cake action describes what happenend
- shopkeeper reducer ties the store and actions together

redux is based on these 3 core concepts :

- a **_store_** that holds the state of your application
- an **_action_** that describes the change in the state of your application
- a **_reducer_** which actually carries out the state transition depending on the action.

# Three principles //////////////////////////////////////////////////////

- First Principle
  "_the state of your whole application is stored in an object tree within a single store_"
  it means maintain your application state in a single object which would be mananged by the redux store.
  taking the example of the cake shop -
  let's assume that you are tracking the numbers of cakes on the shelf
  {
    numberOfCakes:10
  }

- Second Principle
  "_the only way to change the state is to emit an action, which is an object describing what happened_"
  it means to update the state of your app, you need to let the redux know about that with an action. you are not allowed to directly update the state object.
  taking the example of the cake shop -
  in a cake shop we can't take the cake by ourself, similarly we can't update the state directly by ourself we need to tell redux to do it. you need to tell the shopkeeper know about your **_action_** - BUY_CAKE.
  {
    type:BUY_CAKE
  }
  state is read-only

- Third Principle
  "_to specify how the state tree is transformed by actions, you write pure reducers_"
  by pure reducers we mean that we need to write pure functions
  reducer(prevState, action) => newState
  taking the example of the cake shop -
  the shopkeeper is the reducer. he will deduct one from the inventory, print a receipt and hand over the cake to you.

  const reducer=(prevState, action)=>{
    switch(action.type){
        case BUY_CAKE:
        return {
            numberOfCakes: state.numberOfCakes - 1
        }
    }
  }
  now how is this a pure function. for a given input in BUY_CAKE case the output will always be given input - 1.

there is a js app, there is a redux store which is storing app's data. now the app cannot directly change the state so it dispatches a action and the reducer works on the state based on the action provided and gives a new state back to the store. now since app has subcribed to the store it can access the values.(_refer to the images folder_)

# ACTIONS ////////////////////////////////////////////

actions are the only way to interact with the store.
they are plain js object.
they must have a type property defining the type of action to be performed.
the type property is of type string

# REDUCERS //////////////////////////////////////////

reducers sepcify how the state is going to be tranformed in response to the actions sent to the store.
actions only describes what should happen but the how part is done by the reducer.
in terms of coding reducers accept state and action as arguments and returns a new state
(prevState, action) => newState

# REDUX STORE /////////////////////////////////////////
one store for entire application
***responsibilities*** -
> holds application state
> allows access to state via getStae()
> allows state to be updated via dispatch(action) 
> registers listeners via subscribe(listener)
> handles unregistering of listeners via the function returned by subscribe(listener) 

# CAKES AND ICECREAMS ////////////////////////////////
now our business is doing very well and we want to sell ice-creams also in our shop.
now the earlier shopkeeper can handle both the items but still for simplifcation we will keep another person for handling that counter. each are bothered by their own work. 

# MULTIPLE REDUCERS /////////////////////////////////////////////////////

# COMBINE MULTIPLE REDUCERS /////////////////////////////////////////////
redux provides a method called combineReducer for combining multiple reducers. 
after combining also both the reducers receive the dispatch but one of them acts on it and one of them doesn't.

# MIDDLEWARE ///////////////////////////////////////////////////////
it is the suggested way to extend redux with custom functionality. so if you want to use redux with extra funtionality use middleware.
it provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. 
we can use middleware for logging, crash reporting, performing asynchronous tasks etc.
we are going to use ***redux logger*** middleware for understanding. it basically logs all the information related to redux in your application
***how to install it***: npm install redux-logger

***steps***
1. create the middleware by _createLogger_
2. extract _applyMiddleware_ from react
3. pass _applyMiddleware_ to _createStore_  and pass the created logger as argument to the _applyMiddleware_

# ASYNC ACTIONS ///////////////////////////////////////////////////////
***what are synchronous actions?***
as soon as the action is dispatched the state was immediately updated.
on dispatching the BUY_CAKE action the number of cakes were right away decremented by one. same goes for BUY_ICECREAM as well

***what are asynchronous actions?***
asynchronous api calls to fetch the data from an end point and use that data in your application.  

state:{
    loading:true,
    data=[],
    error:'',
}

_loading_: display a loading spinner in your component
_data_: list of users
_error_: diplay error to the user

**_actions_**:
FETCH_USER_REQUEST - fetch a list of users
FETCH_USER_SUCCESS - fetched successfully
FETCH_USER_FAILURE - error fetching the data

**_reducers_**:
case: FETCH_USER_REQUEST
    loading:true
case: FETCH_USER_SUCCESS
    loading:false
    data: data(from API)
case: FETCH_USER_FAILURE
    loading:false
    error: data(from API)

