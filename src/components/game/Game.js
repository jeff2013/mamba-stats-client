import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import '../../styles/pages/game.scss';
import { useEffect } from 'react';
import { addGameStats } from '../../redux/actions/game/action';

function Game({game, teams}) {
    const [homeTeam, setHomeTeam] = useState();
    const [awayTeam, setAwayTeam] = useState();

    useEffect(() => {
        console.log("GAME");
        if (game) {
            const teamMap = new Map(teams.map(t => [t.id, t]));
            setHomeTeam(teamMap.get(game.home_team_id));
            setAwayTeam(teamMap.get(game.away_team_id));
            
        }
    }, [game])

    return (
        <div className="game-container">
            <ScoreKeepContainer type='home' team={homeTeam}></ScoreKeepContainer>
            <ScoreKeepContainer type='away' team={awayTeam}></ScoreKeepContainer>
            {/* <button>End game</button> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams,
        game: state.session.games[0]
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

function ScoreKeep({game, type, team, submitStats}) {
    var score = type === 'home' ? game.home_points : game.away_points;
    const [stat, setStat] = useState();

    const addStats = (user) => {
        if (stat) {
            submitStats(type, game.id, user.id, stat);
            setStat(null);
        }
    }

    return (
        <div className="scorekeep-container">
            <div className="controls">
                <div className="grid-full">{score}</div>
                <button className={"grid-half " + (stat === 'three' ? 'selected' : '')} onClick={() => setStat('three')}>3</button>
                <button className={"grid-half " + (stat === 'two' ? 'selected' : '')} onClick={() => setStat('two')}>2</button>
                <button className={"grid-half " + (stat === 'rebound' ? 'selected' : '')} onClick={() => setStat('rebound')}>RB</button>
                <button className={"grid-half " + (stat === 'assist' ? 'selected' : '')} onClick={() => setStat('assist')}>A</button>
            </div>
            <div className="players">
                <p>{(team !== undefined ? team.name : "No Team")}</p>
                {
                    (team && team.users ? 
                        team.users.map((user, index) => {
                            return <TeamUsers user={user} callback={() => addStats(user)} key={`user-scorekeep-${user.id}`}></TeamUsers>
                        })
                        : <p>No Users</p>)
                }
            </div>
        </div>
    )
}

const mapScoreStateToProps = state => {
    return {
        game: state.session.games[0]
    }
}

const mapScoreDispatchToProps = dispatch => {
    return {
        submitStats: (teamType, gameId, userId, statType) => {
            return dispatch(addGameStats(teamType, gameId, userId, statType))
        }
    }
}

const ScoreKeepContainer = connect(mapScoreStateToProps, mapScoreDispatchToProps)(ScoreKeep)

function TeamUsers({user, callback}) {

    return (
        <div className="team-users" onClick={() => callback()}>
            <p>{user.name}</p>
        </div>
    )
}