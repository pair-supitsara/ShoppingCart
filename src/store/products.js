import { createSlice } from '@reduxjs/toolkit'

const initialProductState = { 
    products: []
}
export const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        update(state, action) {
            state.products = action.products 
        }
    }
})