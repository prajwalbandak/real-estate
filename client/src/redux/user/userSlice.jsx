import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error:null,
    loading : null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInstart:(state) =>{
            state.loading = true
        },
        signInSuccess : (state,action ) =>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading= false;

        },
        signInFailure:(state, action) =>{
            state.error = action.error;
            state.loading= false;
        }
    }
})

export const { signInstart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;