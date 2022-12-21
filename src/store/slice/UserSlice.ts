import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";


interface UserState {
    users: IUser[]
    isLoading: boolean
    error: string
    textSearch: string
    page: number
    limit: number
}

const initialState: UserState = {
    users: [],
    isLoading: true,
    error: '',
    textSearch: '',
    page: 1,
    limit: 5,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersLoading(state) {
            state.isLoading = true;
        },
        getUsersSuccess(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload
        },
        getUsersError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        CreateUser(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            const findItem = state.users.find((obj) => obj.id !== action.payload.id);
            if (findItem) {
                state.users.push({
                    ...action.payload,
                });
            }
        },
        PutUser(state, action: PayloadAction<IUser>) {
            const findItem = state.users.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                (findItem as IUser).email = action.payload.email;
                (findItem as IUser).phone = action.payload.phone;
            }

        },
        deleteUser(state, action: PayloadAction<number>) {
            state.users = state.users.filter((el) => el.id !== action.payload);
        },
        SearchUser(state, action:PayloadAction<string>){
            state.textSearch = action.payload;
        },
        changePage(state, action: PayloadAction<number>){
            state.page = action.payload;
        }
    }
})

export default userSlice.reducer;