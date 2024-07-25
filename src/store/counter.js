import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = { 
    counter: 0
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++
        },
        decrement(state, action) {
            state.counter--
        }
    }
})
