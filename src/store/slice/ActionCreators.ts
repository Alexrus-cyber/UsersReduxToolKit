import {AppDispatch} from "../store";
import axios from "axios"
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
})



export const fetchUsers = (page: number, limit: number,term: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUsersLoading)
        const response = await instance.get<IUser[]>(`users?_page=${page}&_limit=${limit}`)
        dispatch(userSlice.actions.getUsersSuccess(response.data))
    } catch (e) {
        dispatch(userSlice.actions.getUsersError(String(e)))
    }
}

export const deleteUsers = (id: number) => async (dispatch: AppDispatch) => {
    try {
         await instance.delete<IUser>(`users/${id}`)
        dispatch(userSlice.actions.deleteUser(id))
    } catch (e) {
        alert(e)
    }
}

export const createUsers = (name: string, email: string, phone: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUsersLoading)
        const response =  await instance.post<IUser>(`users`, {name: name, email: email, phone: phone})
        dispatch(userSlice.actions.CreateUser(response.data as IUser))

    } catch (e) {
        alert(e)
    }
}
export const PutUsers = (id:number,name: string,email: string, phone: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await instance.put<IUser>(`users/${id}`, {name: name, email: email, phone: phone})
        dispatch(userSlice.actions.PutUser(response.data as IUser))
    } catch (e) {
        alert(e)
    }
}