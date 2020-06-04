import React from 'react';
import { connect } from 'react-redux';
import GameTeamSelection from '../components/game/GameTeamSelection';
import Game from '../components/game/Game';
import { createSession, fetchSession } from '../redux/actions/session/action';
import { useEffect } from 'react';
import { fetchActiveGame } from '../redux/actions/game/action';

function GamePage({session, game, startSession, fetchSession}) {
    useEffect(() => {
        fetchSession().then(res => {
            // TODO: Handle loading state
            fetchActiveGame(res.payload.id);
        });
    }, [])

    const createSession = () => {
        startSession();
    }

    return (
        <div>
            <h1>Start a Game</h1>
            { (session.id !== undefined) 
                        ? (game.id) 
                            ? <Game></Game>
                            : <GameTeamSelection session={session}></GameTeamSelection>
                        : <StartSession createSession={() => createSession()}></StartSession> 
            }
        </div>
    )
}   

function StartSession(props) {
    return (
        <div>
            <h1>Start Session</h1>
            <p>Your session will last 24 hours</p>
            <button onClick={() => props.createSession()}>Start Session</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        startSession: () => {
            return dispatch(createSession());
        },
        fetchSession: () => {
            return dispatch(fetchSession());
        },
        fetchActiveGame: (sessionId) => {
            return dispatch(fetchActiveGame(sessionId));
        }
    }
}

const mapStateToProps = state => {
    return { 
        session: state.session,
        game: state.game
     }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePage)