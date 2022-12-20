import {AppDispatch} from "../store";
import axios from "axios"
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
})

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUsersLoading)
        const response = await instance.get<IUser[]>(`users`)
        dispatch(userSlice.actions.getUsersSuccess(response.data))
    } catch (e) {
        dispatch(userSlice.actions.getUsersError(String(e)))
    }
}

export const deleteUsers = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUsersLoading)
        await instance.delete<IUser[]>(`users/${id}`)
        dispatch(fetchUsers());
    } catch (e) {
        alert(e)
    }
}

export const createUsers = (name: string, email: string, phone: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUsersLoading)
        const user = {
            name: name,
            email: email,
            phone: phone
        }
        await instance.post<IUser[]>(`users`, {name: name, email: email, phone: phone})
        dispatch(userSlice.actions.CreateUser(user as IUser))
        dispatch(fetchUsers());
    } catch (e) {
        alert(e)
    }
}