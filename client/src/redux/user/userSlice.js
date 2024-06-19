import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       signInStart: (state)=>{
        state.loading = true;
       },
       signInSuccess: (state, action)=>{
        state.error = null,
        state.loading = false,
        state.currentUser = action.payload
       },
       signInFailure: (state,action)=>{
         state.error = action.payload,
         state.loading = false
       },
        updateUserStart: (state,action)=>{
         state.loading = true
       },
       updateUserSuccess: (state,action)=>{
        state.loading = false,
        state.currentUser=action.payload,
        state.error = null
      },
      updateUserFailure: (state,action)=>{
        state.loading = false,
        state.error = action.payload
      }
    }
});

export const {signInFailure, signInStart, signInSuccess, updateUserFailure, updateUserStart, updateUserSuccess} = userSlice.actions;
export default userSlice.reducer;