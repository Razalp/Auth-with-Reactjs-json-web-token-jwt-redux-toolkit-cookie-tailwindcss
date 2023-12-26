import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    loading:false,
    error:null,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart :(state)=>{
            state.loading = true;
        },
        signInSucces:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailer:(state,action)=>{
            state.loading=false;
            state.error =action.payload
        },

    }
})

export const {signInStart,signInFailer,signInSucces}=userSlice.actions;


export default userSlice.reducer;