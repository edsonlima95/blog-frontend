import { useContext, useReducer } from "react"


import { counterReducer } from './store/reducers/counterReducer'
import { add, remove } from './store/actions/counter'
import { CounterContext } from '../../contexts/Counter'
import { counterReducer2 } from "../../store/reducers/counterReducer2"
import { add2, remove2 } from "../../store/actions/counter"
import Test from "../post/teste"

const initialState = {
    counter: 0
}

function Counter() {

    const { state2, dispatch2 } = useContext(CounterContext)

    console.log(state2.counter2)

    const [state1, dispatch1] = useReducer(counterReducer, initialState)


    return (
        <div>
            <h1>Contador local</h1>
            <h2 style={{ color: 'white' }}>{state1.counter}</h2>

            <button onClick={() => add(dispatch1, { name: 'edson', age: 30 })}>ADD</button>
            <button onClick={() => remove(dispatch1, { name: 'edson', age: 30 })}>REMOVE</button>

            <br />
            <br />

            <h1>Counter com Global</h1>

            <h2 style={{ color: 'white' }}>{state2.counter2}</h2>

            <br />

            <button onClick={() => add2(dispatch2)}>ADD</button>
            <button onClick={() => remove2(dispatch2)}>REMOVE</button>

            <br />
            <br />

            <Test />

        </div>
    )

}

export default Counter