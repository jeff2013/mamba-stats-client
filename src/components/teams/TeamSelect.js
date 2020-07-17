import React from "react";
import { connect } from "react-redux";
import { fetchTeams } from '../../redux/actions/team/action';
import { useEffect } from "react";
import '../../styles/components/teams/team-select.scss';
import { useState } from "react";
import { animated, useSpring } from 'react-spring';


/**
 * 
 * Can spread the params
 * 
 * @param {*} param0 
 */
function TeamSelect({teams, fetchTeams, selectTeam, id}) {
    const [selectedTeam, setSelectedTeam] = useState();

    useEffect(() => {
        // Component did mount
        fetchTeams();
    }, [fetchTeams])

     return (
       <div>
          <ul className="team-list">
              {teams && teams.length
              ? teams.map((team, index) => {
                  return <Team key={`team-${team.id}`} team={team} selectedTeam={selectedTeam} setTeam={setSelectedTeam}></Team>
                  })
              : "No Teams, yay!"}
          </ul>
        <button className="confirm-button" onClick={() => selectTeam(selectedTeam, id)}>Confirm</button>
       </div>
        
        )
}

function Team({team, selectedTeam, setTeam}) {
  const [isSelected, setIsSelected] = useState(() => false);

  const [border, setBorder] = useSpring(() => ({
    borderColor: 'white'
  }))

  useEffect(() => {
    const selected = selectedTeam && selectedTeam.id === team.id
    setBorder({
      borderColor: selected ? '#9CDEC1' : 'white'
    })
  }, [team, selectedTeam, setBorder])

  const setSelected = (team) => {
    const _isSelected = !isSelected;
    setIsSelected(_isSelected);
    setTeam(team);
  }

  return (
    <animated.div style={border} className="team"  onClick={() => setSelected(team)}>
      <p className="team-name">{team.name}</p>
    </animated.div>
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
)(TeamSelect);