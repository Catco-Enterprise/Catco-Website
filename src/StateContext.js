import React, { createContext, useContext, useReducer } from "react";

/*
  Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
    Some Related React Docs:
      Extracting State Logic into a Reducer: https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer
      Passing Data Deeply with Context: https://beta.reactjs.org/learn/passing-data-deeply-with-context
      Scaling Up with Reducer and Context: https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context


  ****READ COMMENTS BELOW IN THE ORDER THEY'RE NUMBERED****. Thought it might be the easiest way to understand
*/

/* 
  (3) 
    To give our components access to this state, we're going to create a context object we'll call StateContext.
    And because our components will also need a way to update that state, we need to give it access to the dispatch function, so we'll create a context object for that too.

    Import createContext from react. It takes an initial value as the parameter. NOTE: this is not assigning our state object an initial value of null, just the context. Don't worry too much about it, as it will be assigned a value below.
    createContext returns a context object containing a Provider and a Consumer (don't worry about Consumer- it's apparently rarely used anymore). Think of the Provider as a component that *provides* a value accessible to all components below it in the tree (which will be our state)
*/
const StateContext = createContext(null);
const StateDispatchContext = createContext(null);

const savedToken = localStorage.getItem("token");

const initToken = savedToken ? savedToken : "";

/*
  (5) to keep things a little cleaner back in our src/index.js, we declare this component StateProvider to hold our two Providers and give it a prop {childen} to represent all the children components the Providers will wrap around. Then back in src/index.js, we can import this one component to wrap around our application
*/
export function StateProvider({ children }) {
	/* **for step 1, don't concern yourself with the component we're inside of right now and focus on the useReducer function below**
    (1) useReducer is similar to useState, but allows us to hold many different state values in one state object, rather than having to call useState for each piece of state we want to create.
      a. useReducer takes a reducer function (just keep reading!) and an object of initial state values
      b. similar to useState, useReducer returns the current state value (state) and a function (dispatch) to update the state (sorta)
      c. dispatch doesn't actually update the state directly. it's a function that takes an action object as a parameter (dispatch(action)) to send (or dispatch) the action to the reducer function that tells the reducer which state value to update and the value to update it with
  */
	const [state, dispatch] = useReducer(reducer, {
		token: initToken,
		user: {},
		products: [],
		categories: [],
		order: {},
	});

	/*
    (4)
      Imagine the return below was our src/index.js file
      {children} refers to the child components in the tree that we want to provide the context to.
      In our case, this would be the entire application, so we would wrap the App (and BrowserRouter, but not React.StrictMode) with the StateContext.Provider and pass it our state (like a prop) as the context value. 
      This would be followed by the StateDispatchContext.Provider, which is passed the dispatch function as it's context to provide to the child components.
  */
	return (
		<StateContext.Provider value={state}>
			<StateDispatchContext.Provider value={dispatch}>
				{children}
			</StateDispatchContext.Provider>
		</StateContext.Provider>
	);
}

/*
  (6) 
    With the context provided to the children components, we access those values in children components using useContext, and pass it the context object whose value we want to access.
    We'll declare a function to return the value of the context created in this file, and these functions can be imported into the child components (rather than passed down the tree as props) in order to read those values.
    When imported into a component, we can write something like:
      const state = useForState();
      const dispatch = useStateDispatch();
    Then we can access the key/value pairs held in the state object or declare the dispatch function to update state. 
    
    You don't need to import both functions if you don't have a need for both. If you only need to access the values in state, only import useForState. If you only need to update a value in state, but aren't reading a value from the current state in your component, then you only need to import useStateDispatch().
*/
export function useForState() {
	return useContext(StateContext);
}

export function useStateDispatch() {
	return useContext(StateDispatchContext);
}

/*
  (2) reducer essentially replaces the "set" functions that would be used with useState (side note: reducers are not just a React state-management thing. Just very useful for it, so don't necessarily limit your understanding of it to this specific use.)
    -parameters:
      -the current state (obj),
      -an action (obj)
        -action = {type: "a string describing the change being made", payload: (value to update state with) }
    
    switch is essentially a big if/else statement that's passed the action type from the dispatch function and will run the function associated with the case matching the action type
      -here we just return the state object, destructured to return all the fields held in the current state object (...state) but reassigning the key we want to update (determined by the action type sent to the reducer by the dispatch function) to the value of the action payload (again, sent to the reducer by the dispatch function)
      -if the action type does not match any of the cases, by default, the reducer will return the current state, unchanged.
      -Example call for dispatch-- dispatch({ type: "setToken", payload: updatedValue }) -- we're just destructuring the action to assign the values of the action type and payload directly in the function call.
*/
function reducer(state, action) {
	switch (action.type) {
		case "setToken": {
			return { ...state, token: action.payload };
		}
		case "setUser": {
			return { ...state, user: action.payload };
		}
		case "setProducts": {
			return { ...state, products: action.payload };
		}
		case "setCategories": {
			return { ...state, categories: action.payload };
		}
		case "setOrder": {
			return { ...state, order: action.payload };
		}
		default: {
			return state;
		}
	}
}
