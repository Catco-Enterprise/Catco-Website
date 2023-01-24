import { createContext, useContext, useReducer } from "react";

const initialState = {
    currentUser: {},
    products: [],
};

// Let's initialize our React.Context class.
const CatcoContext = createContext(initialState);

// 'children' represents the child components that will inherit this context class.
// 'state' represents the value of a property from the object.
// 'dispatch' represents a function to set the value of a property from the object.
export function CatcoProvider({ children }) {
    const [state, dispatch] = useReducer(catcoReducer, initialState);

    // setCurrentUser() is just a more friendly way of accessing dispatch().
    function setCurrentUser(user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
    }

    // setProducts() is just a more friendly way of accessing dispatch().
    function setProducts(products) {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
    }

    const value = {
        currentUser: state.currentUser,
        setCurrentUser,
        products: state.products,
        setProducts
    };

    return (
        <CatcoContext.Provider value={value}>
            {children}
        </CatcoContext.Provider>
    );
}

// 'catcoReducer' represents a handler for dictating which property of the context to get or set
// and what value to get or set.
function catcoReducer(state, action) {
    switch (action.type) {
        // If the action {type: 'setUser'}, we will proceed to 
        // set the value to the new 'state' AKA the value of the payload
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// A friendly method to ensure our context is being accessed properly
function useCatcoContext() {
    const context = useContext(CatcoContext);

    if (context === undefined)
        throw new Error("useCatcoContext must be used within CatcoProvider.");

    return context;
}

export default useCatcoContext;