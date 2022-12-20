import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {createUsers, deleteUsers, fetchUsers} from "./store/slice/ActionCreators";


const App = () => {
    const {users, isLoading, error} = useAppSelector(state => state.userReducer)
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])


    const deleteUser = useCallback((id: number) => {
        dispatch(deleteUsers(id))
    }, [dispatch])

    const createUser = useCallback((name: string, email: string, phone: string) => {
        dispatch(createUsers(name, email, phone))
    }, [dispatch])

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
        <div className="App">
            {isLoading && <h1>HELlo</h1>}
            {error && <h1>{error}</h1>}
            {isLoading ? <div>Wait.....</div> :
                <div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div style={{display: "block"}}>
                            <input value={text} onChange={change}/>
                            {users.filter((el) => el.name.includes(text)).map(
                                (el) => <div key={el.id} style={{border: "1px solid gray", marginTop: 20}}>
                                    <p>
                                        Имя: {el.name}
                                    </p>
                                    <p>
                                        email: {el.email}
                                    </p>
                                    <p>
                                        Telephone: {el.phone}

                                    </p>
                                    <button onClick={() => deleteUser(el.id)}>DEl</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={() => createUser("Vova", "ewtrfadf", "653634634")}>Создать user</button>
                </div>
            }
        </div>
    );
}

export default App;
