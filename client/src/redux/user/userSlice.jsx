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
        },
        updateUserStart:(state)=>{
            state.loading = true
        },
        updateUserSuccess :(state, action) =>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading= false;
        },
        updateUserFailure:(state, action) =>{
            state.error = action.error;
            state.loading= false;
        },
        deleteUserStart:(state) =>{
            state.loading = true
            
        },
        deleteUserSuccess :(state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading= false;
        },
        deleteUserFailure :(state, action) =>{
            state.error = action.payload;
            state.loading= false;
        },
        signOutUserStart:(state) =>{
            state.loading = true
            
        },
        signOutUserSuccess :(state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading= false;
        },
        signOutUserFailure :(state, action) =>{
            state.error = action.payload;
            state.loading= false;
        }
    }
})

export const { signInstart, 
    
    
    signOutUserStart, signOutUserFailure, signOutUserSuccess, 
    signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure , deleteUserStart, deleteUserSuccess, deleteUserFailure} = userSlice.actions;

export default userSlice.reducer;