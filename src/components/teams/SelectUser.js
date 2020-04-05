import React from 'react';
import { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { ReactComponent as Checkmark } from '../../assets/checkmark.svg';

export default function SelectUser(props) {
    const user = props.user;
    const selectUser = props.select;

    const [isSelected, setIsSelected] = useState(() => false)

    const [buttonResize, setButtonResize] = useSpring(() => ({
        width: '100px',
        fontSize: '14px',
        backgroundColor: 'green'
    }));

    const [checkmark, setCheckmark] = useSpring(() => ({
        display: 'none'
    }));

    useEffect(() => {
        setButtonResize({
            width: isSelected ? '25px' : '100px',
            fontSize: isSelected ? '0px' : '14px',
            backgroundColor: isSelected ? 'green' : 'lightsalmon'
        })
        setCheckmark({
            display: isSelected ? 'block' : 'none',
            opacity: isSelected ? '1' : '0',
            delay:  isSelected ? '440' : '0'
        })
    }, [isSelected, setButtonResize, setCheckmark])


    const toggleUser = (user) => {
        const _isSelected = !isSelected;
        setIsSelected(_isSelected);
        selectUser(user, _isSelected);
    }

    return (
        <div className="container">
            <div className="info-container">
                <p className="name">{user.name}</p>
                <p className="position">{user.position}</p>
            </div>
            <animated.button className="select-user" style={buttonResize} onClick={() => toggleUser(user)}>Select User
                <animated.div style={checkmark}>
                    <Checkmark />
                </animated.div>
            </animated.button>
        </div>
    )
}