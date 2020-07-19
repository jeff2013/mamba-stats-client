import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login, createGroup } from '../redux/actions/auth/action';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/pages/login-page.scss";
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { useSpring, animated as a } from 'react-spring'

function LoginPage(props) {
    const [pageState, setPageState] = useState('welcome')
    const [token, setToken] = useState('')

    const navigateTo = (state, token) => {
        setToken(token);
        setPageState(state);
    }
    
    return (
        <div className="login-page">
            <h1>Mamba Stats</h1>

            <button className="login outline" onClick={() => navigateTo('login')}>Login</button>
            <button className="create outline" onClick={() => navigateTo('create-account')}>Create Group</button>

            { pageState === 'login' || pageState === 'create-account' ? 
                <AccountForm navigateTo={(state, token) => navigateTo(state, token)} token={token}/>
                : pageState === 'create-account' ? 
                <AccountForm navigateTo={(state, token) => navigateTo(state, token)} />
                : <div/>
            }
        </div>
    )
}

function AccountForm(props) {
    const [groupName, setGroupName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const [createPassword, setCreatePassword] = useState('')

    const registerGroup = async (groupName, password) => {
        const id = await props.createGroup(groupName, password);
        props.navigateTo('login', id);
    }

    const [flipped, setFlipped] = useState(false)
    const { transform, opacity, display } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        display: flipped ? 'flex' : 'none',
        config: { mass: 5, tension: 500, friction: 80 }
    })

    

    useEffect(() => {
        if (props.group_name) {
            setGroupName(props.group_name)
        }
    }, [])

    const login = async(groupName, password) => {
        // TODO add loading state.
        await props.login(groupName , password);
        history.push('/users');
    }

    const dismissModal = () => {
        props.navigateTo("welcome")
    }

    const flip = (state) => {
        setFlipped(state => !state);
        props.navigateTo(state);
    }

    return (
        <div>
            <a.div className="account-container animated-container" style={{ opacity: opacity.interpolate(o => 1 - o), transform, display: display.interpolate(d => d === 'none' ? 'flex' : 'none') }}>
                <div className="flex-row">
                    <h2>Login</h2>
                    <AiOutlineCloseSquare className="close-icon" onClick={() => dismissModal()}/>
                </div>
                
                <div className="input-container">
                    <input type="text" name="Group Name" placeholder="Group Name"value={groupName} onChange={e => setGroupName(e.target.value)}></input>
                </div>
                <div className="input-container">
                    <input type="text" name="Group Password" placeholder="Group Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button className="outline primary" onClick={() => login(groupName, password)}>Login</button>
                <button className="outline secondary" onClick={() => flip('create-account')}>Create Group</button>
            </a.div>

            <a.div className="account-container animated-container" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`), display }}>
                <div className="flex-row">
                    <h2>Create Account</h2>
                    <AiOutlineCloseSquare className="close-icon" onClick={() => dismissModal()}/>
                </div>
                <div className="input-container">
                    <input type="text" name="Group Name" placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)}></input>
                </div>
                <div className="input-container">
                    <input type="text" name="Group Password" placeholder="Group Password" value={createPassword} onChange={e => setCreatePassword(e.target.value)}></input>
                </div>
                <button className="outline primary" onClick={() => registerGroup(groupName, password)}>Create Group</button>
                <button className="outline secondary" onClick={() => flip('login')}>Login</button>
            </a.div>
            
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