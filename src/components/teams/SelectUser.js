import React from 'react';
import { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

export default function SelectUser(props) {
    const user = props.user;
    const selectUser = props.select;

    const [isSelected, setIsSelected] = useState(() => false)

    const [checkmark, setCheckmark] = useSpring(() => ({
        width: '100px',
        fontSize: '14px',
        backgroundColor: 'green'
    }));

    useEffect(() => {
        setCheckmark({
            width: isSelected ? '25px' : '100px',
            fontSize: isSelected ? '0px' : '14px',
            backgroundColor: isSelected ? 'green' : 'lightsalmon'
        })
    }, [isSelected, setCheckmark])


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
            <animated.button style={checkmark} onClick={() => toggleUser(user)}>Select User</animated.button>
        </div>
    )
}