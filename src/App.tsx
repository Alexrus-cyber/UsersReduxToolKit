import debounce from 'lodash.debounce';
import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {createUsers, deleteUsers, fetchUsers, PutUsers} from "./store/slice/ActionCreators";
import {userSlice} from "./store/slice/UserSlice";


const App = () => {
    const {users, isLoading, error, limit, page, textSearch} = useAppSelector(state => state.userReducer)
    const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers(page, limit, textSearch));
    }, [dispatch, page, limit, textSearch])


    const deleteUser = useCallback((id: number) => {
        dispatch(deleteUsers(id))
    }, [dispatch])

    const createUser = useCallback((name: string, email: string, phone: string) => {
        dispatch(createUsers(name, email, phone))

    }, [dispatch])
    const PutUser = useCallback((id: number, name: string, email: string, phone: string) => {
            dispatch(PutUsers(id, name, email, phone))
        },
        [dispatch],
    );
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(userSlice.actions.SearchUser(str));
        }, 200),[]);

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        updateSearchValue(e.target.value)

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
                            {users.map(
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
                                    <button onClick={() => PutUser(el.id, el.name, "email", "7915195")}>Red</button>
                                </div>
                            )}
                        </div>
                    </div>
                    {page !== 1 ?
                        <button onClick={() => dispatch(userSlice.actions.changePage(page - 1))}>back</button> :
                        <button onClick={() => dispatch(userSlice.actions.changePage(page + 1))}>go</button>}


                    <button onClick={() => createUser("Dima", "helloworld@mail.ru", "+741344312433")}>Создать user
                    </button>
                </div>
            }
        </div>
    );
}

export default App;
