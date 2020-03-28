import React from "react";
import { connect, useSelector } from "react-redux";
import { fetchTeams } from '../../redux/actions/team/action';
import  TeamUsers from './TeamUsers';
import { useEffect } from "react";


function TeamList(props) {

    const teams = useSelector(state => state.teams);

    useEffect(() => {
        // Component did mount
        props.fetchTeams();
    }, [])

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