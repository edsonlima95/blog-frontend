import { createContext, DispatchWithoutAction, useReducer } from "react";
import { counterReducer2 } from "../store/reducers/counterReducer2";

const initialState2 = {
    counter2: 20,
}

type ContextProps = {
    state2: {
        counter2: number,
    },

    dispatch2: any
}

export const CounterContext = createContext({} as ContextProps);


export function CounterProvider({ children }) {

    const [state2, dispatch2] = useReducer(counterReducer2, initialState2)

    return (
        <CounterContext.Provider value={{state2, dispatch2}}>
            {children}
        </CounterContext.Provider>
    )

}