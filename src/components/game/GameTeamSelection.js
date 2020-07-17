import React from 'react';
import { connect } from 'react-redux';
import { fetchActiveGame, createGame } from '../../redux/actions/game/action';
import { useState } from 'react';
import '../../styles/pages/game-team-selection.scss';
import Modal from 'react-modal';
import TeamSelect from '../teams/TeamSelect';
import { useEffect } from 'react';
import { fetchSession } from '../../redux/actions/session/action';
import { fetchTeams } from '../../redux/actions/team/action';

Modal.setAppElement(document.getElementById('root'))

function GameTeamSelection({teams, fetchSession, fetchActiveGame, startGame, session, fetchTeams}) {
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
        closeModal();
        
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
            <div className="team-selection-container">
                <div className="selected-teams">
                    <div className="team-container home">
                        <div className="team-home">
                            {
                                homeTeam ? 
                                <div className="select-team left">
                                    <p>{ homeTeam.name} </p>
                                    <button onClick={(e) => openTeamSelectModal('home')} >Change Team</button>
                                </div>
                                : <div className="select-team left">
                                    <p>Home Team</p>
                                    <button onClick={(e) => openTeamSelectModal('home')} >Select Team</button>
                                </div>
                            }
                        </div>
                        <svg className="home" viewBox="0 0 200 75">
                                <path d="M0 0 H200 Q200 15 185 20 L33 62 Q-5 73 0 30" />
                            </svg>
                    </div>
                    <div className="team-container">

                    <svg className="away" viewBox="0 0 200 75">
                        <path d="M0 0 H200 Q200 15 185 20 L33 62 Q-5 73 0 30" />
                    </svg>
                        <div className="team-away" onClick={(e) => openTeamSelectModal('away')}>
                        {
                                awayTeam ? 
                                <div className="select-team right">
                                    <p>{ awayTeam.name} </p>
                                    <button onClick={(e) => openTeamSelectModal('home')} >Change Team</button>
                                </div>
                                : <div className="select-team right">
                                    <p>Away Team</p>
                                    <button>Select Team</button>
                                </div>
                            }
                        </div>

                    </div>
                    
                </div>
                <button className="start-game-button" onClick={() => createGame(homeTeam, awayTeam)}>Start Game</button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="team-selection-modal">
                <h2>
                    Select A Team
                </h2>
                
                <TeamSelect selectTeam={(team, id) => selectTeamFor(team, id)} id={teamIdentifier}></TeamSelect>

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
        },
        fetchActiveGame: (sessionId) => {
            return dispatch(fetchActiveGame(sessionId))
        },
        fetchTeams: () => {
            return fetchTeams
        }
    }
}


const mapStateToProps = state => {
    return { 
        session: state.session,
        game: state.game,
        teams: state.teams
     }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTeamSelection)