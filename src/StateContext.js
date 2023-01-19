import React, { createContext, useContext, useReducer } from "react";

/*
  Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
*/
const StateContext = createContext(null);
const StateDispatchContext = createContext(null);

const savedToken = localStorage.getItem("token");

const initToken = savedToken ? savedToken : "";

export function StateProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, {
		token: initToken,
		user: {},
		products: [],
		categories: [],
		order: {},
	});

	return (
		<StateContext.Provider value={state}>
			<StateDispatchContext.Provider value={dispatch}>
				{children}
			</StateDispatchContext.Provider>
		</StateContext.Provider>
	);
}

export function useForState() {
	return useContext(StateContext);
}

export function useStateDispatch() {
	return useContext(StateDispatchContext);
}

/*
	replaces the "set" functions that would be used with useState
	parameters: the current state (obj), an action (obj)
		action = {type: "a string describing the change being made", payload: (value to update state with) }
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
