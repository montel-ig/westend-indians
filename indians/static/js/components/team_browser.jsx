const Team = (props) => {
  return (
    <div className="team-container" onClick={null}>
      <img src="http://indiansproduction.s3.amazonaws.com/assets/logo-6cfd4cd67c604e09322045e30fad2986.jpg"/>
      <p>{props.name}</p>
    </div>
  )
};

class TeamBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ages8to10: false,
      ages10to12: false,
      ages12to15: false,
      activityLvlOne: false,
      activityLvlTwo: false,
      activityLvlThree: false,
      activityLvlOverThree: false,
      athletePath: false,
      competitorPath: false,
      amateurPath: false,
      floorballSchools: false,
      afternoonActivities: false,
      specialGroups: false,
      tapiola: false,
      leppavaara: false,
      matinkylaOlari: false,
      espoonKeskus: false,
      espoonlahti: false,
      kauklahti: false,
      pohjoisEspoo: false,
      floorball: false,
      multisportGroups: false,
      football: false,
      runningCourses: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  mapTeams(teams) {
    return jsonToArray(teams).map(team => {
      if (this.teamInChecked(team)) {
        return <Team
          name={team.name}
          key={team.key}
        />
      }
    });
  }

  teamInChecked(team) {
    let teamInCheckedTerms = false
    Object.values(team).filter((property) => {
      if (this.state.hasOwnProperty(property) && this.state[property]) {
        teamInCheckedTerms = true
      }
    });
    return teamInCheckedTerms;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <TeamFilter {...this.state} handleInputChange={this.handleInputChange} />
        <div className="team-browser-root">
          {this.mapTeams(this.props.teams)}
        </div>
      </div>
    );
  }
}

TeamBrowser.defaultProps = {
  teams: {
    0: {
      name: "testTeam",
      ages: "ages8to10",
      activity: "activityLvlOne",
      path: "amateurPath",
      area: "leppavaara",
      sport: "floorball"
    },
    1: {
      name: "team Test",
      ages: "ages10to12",
      activity: "activityLvlTwo",
      path: "competitorPath",
      area: "tapiola",
      sport: "floorball"
    },
    2: {
      name: "Test Test",
      ages: "ages12to15",
      activity: "activityLvlTwo",
      path: "athletePath",
      area: "tapiola",
      sport: "floorball"
    },
  }
}

function createTeamBrowser(id) {
  ReactDOM.render(
    <TeamBrowser />,
    document.getElementById(id)
  );
}