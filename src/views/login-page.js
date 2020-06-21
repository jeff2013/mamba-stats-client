import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login, createGroup } from '../redux/actions/auth/action';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage(props) {
    const [pageState, setPageState] = useState('welcome')
    const [token, setToken] = useState('')

    const navigateTo = (state, token) => {
        setToken(token);
        setPageState(state);
    }

    return (
        <div>
            <h1>Mamba Stats</h1>
            { pageState === 'login' ? 
                <Login navigateTo={(state, token) => navigateTo(state, token)} login={(name, password) => props.login(name, password)} token={token}/>
                : pageState === 'create-account' ? 
                <CreateAccount navigateTo={(state, token) => navigateTo(state, token)} createGroup={(name, password) => props.createGroup(name, password)}/>
                : <Welcome navigateTo={(state) => setPageState(state)}/>
            }
        </div>
    )
}

function Login(props) {
    const [groupName, setGroupName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();


    useEffect(() => {
        if (props.group_name) {
            setGroupName(props.group_name)
        }
    }, [])

    const login = async(groupName, password) => {
        await props.login(groupName , password);
        history.push('/users');
    }

    return (
        <div>
            <h2>Login</h2>
             <div className="input-container">
                <input type="text" name="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)}></input>
            </div>
            <div className="input-container">
                <input type="text" name="Group Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick={() => login(groupName, password)}>Login</button>
        </div>
    )
}

function CreateAccount(props) {
    const [password, setPassword] = useState('')
    const [groupName, setGroupName] = useState('')

    const registerGroup = async (groupName, password) => {
        const id = await props.createGroup(groupName, password);
        props.navigateTo('login', id);
    }

    return (
        <div>
            <h2>Create Account</h2>
            <div className="input-container">
                <input type="text" name="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)}></input>
            </div>
            <div className="input-container">
                <input type="text" name="Group Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick={() => registerGroup(groupName, password)}>Create Group</button>
        </div>        
    )
}

function Welcome(props) {

    return (
        <div>
            <button onClick={() => props.navigateTo('create-account')}>Create Group</button>
            <button onClick={() => props.navigateTo('login')}>Log in</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: async (name, password) => {
            return await dispatch(login(name, password))
        },
        createGroup: async (name, password) => {
            return await dispatch(createGroup(name, password));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(LoginPage)