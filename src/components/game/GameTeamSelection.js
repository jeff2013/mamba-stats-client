import React from 'react';
import { connect } from 'react-redux';
import { fetchActiveGame, createGame } from '../../redux/actions/game/action';
import { useState } from 'react';
import '../../styles/pages/game-team-selection.scss';
import Modal from 'react-modal';
import TeamList from '../teams/TeamList';
import { useEffect } from 'react';
import { fetchSession } from '../../redux/actions/session/action';

Modal.setAppElement(document.getElementById('root'))

function GameTeamSelection({fetchSession, fetchActiveGame, startGame, session}) {
    const [homeTeam, setHomeTeam] = useState();
    const [awayTeam, setAwayTeam] = useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [teamIdentifier, setTeamIdentifier] = useState();

    useEffect(() => {
        fetchSession().then(res => {
            // Handle loading state
            fetchActiveGame(res.payload.id);
        });
    }, [])

    const selectTeamFor = (team, identifier) => {
        switch(identifier) {
            case 'home':
                setHomeTeam(team);
                break;
            case 'away':
                setAwayTeam(team);
                break;
            default:
                break;
        }
        
    }

    const openTeamSelectModal = (team) => {
        setTeamIdentifier(team);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const createGame = (homeTeam, awayTeam) => {
        if (homeTeam && awayTeam) {
            startGame(homeTeam.id, awayTeam.id, session.id)
        }
    }

    return (
        <div className="game-team-selection">
            <h1>GAME</h1>
            <div className="team-selection-container">
                <div className="selected-teams">
                    <div className="team-button" onClick={(e) => openTeamSelectModal('home')}>
                        {
                            homeTeam ? 
                            <p>{homeTeam.name}</p>
                            : <p> + </p>
                        }
                    </div>
                    <div className="team-button" onClick={(e) => openTeamSelectModal('away')}>
                    {
                            awayTeam ? 
                            <p>{awayTeam.name}</p>
                            : <p> + </p>
                        }
                    </div>
                </div>

                <button onClick={() => createGame(homeTeam, awayTeam)}>Start Game</button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="team-selection-modal">
                <p>Boom</p>
                <TeamList selectTeam={(team, id) => selectTeamFor(team, id)} id={teamIdentifier}></TeamList>
            </Modal>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        fetchSession: () => {
            return dispatch(fetchSession());
        },
        startGame: (home_id, away_id, session_id) => {
            return dispatch(createGame(home_id, away_id, session_id));
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
)(GameTeamSelection)