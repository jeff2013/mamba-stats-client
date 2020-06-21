import React from 'react';
import loadingBasketball from '../assets/loading.gif'
import '../styles/components/loading.scss';

export default function Loading() {
    return (
        <div className="loading">
            <div className="container">
                <img src={loadingBasketball} alt="loading basketball"></img>
                <p>Loading...</p>
            </div>
        </div>
    )
}