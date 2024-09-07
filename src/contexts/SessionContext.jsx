import { createContext, useReducer, useContext, useCallback } from "react";

const SessionContext = createContext();

const sessionReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, isLoggedIn: true, isAdmin: action.payload.isAdmin };
        case "CLEAR_USER":
            return { ...state, isLoggedIn: false, isAdmin: false };
        default:
            return state;
    }
};

const SessionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sessionReducer, {
        isLoggedIn: !!sessionStorage.getItem('key') || !!sessionStorage.getItem('adminKey'),
        isAdmin: !!sessionStorage.getItem('adminKey'),
    });

    const setUser = useCallback(() => {
        const adminKey = sessionStorage.getItem('adminKey');
        const userKey = sessionStorage.getItem('key');
        if (adminKey) {
            dispatch({ type: "SET_USER", payload: { isAdmin: true } });
        } else if (userKey) {
            dispatch({ type: "SET_USER", payload: { isAdmin: false } });
        } else {
            dispatch({ type: "CLEAR_USER" });
        }
    }, []);

    const clearUser = useCallback(() => {
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('adminKey');
        dispatch({ type: "CLEAR_USER" });
    }, []);

    return (
        <SessionContext.Provider value={{ ...state, setUser, clearUser }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionContextProvider, useSession };
