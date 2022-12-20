import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";

interface UserState {
    users: IUser[]
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: true,
    error: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersLoading(state){
            state.isLoading = true;
        },
        getUsersSuccess(state,action: PayloadAction<IUser[]>){
            state.isLoading = false;
            state.error = '';
            state.users = action.payload
        },
        getUsersError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },
        CreateUser(state,action: PayloadAction<IUser>){
            state.users.push(action.payload);
        },
    }
})

export default userSlice.reducer;