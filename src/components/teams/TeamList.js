import React from "react";
import { connect } from "react-redux";
import { fetchTeams } from '../../redux/actions/team/action';
import  TeamUsers from './TeamUsers';
import { useEffect } from "react";


/**
 * 
 * Can spread the params
 * 
 * @param {*} param0 
 */
function TeamList({teams, fetchTeams}) {
    useEffect(() => {
        // Component did mount
        fetchTeams();
    }, [fetchTeams])

     return (

        <ul className="user-list">
            {teams && teams.length
            ? teams.map((team, index) => {
                return <TeamUsers key={`team-${team.id}`} team={team}></TeamUsers>;
                })
            : "No Teams, yay!"}
        </ul>
        )
}

/**
 * Called every time redux store updates
 * @param {*} state 
 */
const mapStateToProps = state =>  {
    return { teams: state.teams }
}

export default connect(
    mapStateToProps,
    {
        fetchTeams
    }
)(TeamList);