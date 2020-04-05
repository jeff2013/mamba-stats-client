import React from 'react';
import '../styles/user.scss';

function User({player}) {
    return (
        <div className="user-container">
            <div className="left-container">
                <p className="bold uppercase">{player.name}</p>
                <p className="subtext">position</p>
            </div>
            <div className="right-container">
                <div className="stat">
                    <b>{player.ppg}</b>
                    <p className="subtext">PPG</p>
                </div>  
                <div className="stat">
                    <b>{player.apg}</b>
                    <p className="subtext">APG</p>
                </div> 
                <div className="stat">
                    <b>{player.rpg}</b>
                    <p className="subtext">RPG</p>
                </div> 
            </div>
        </div>
    )
}

export default User;