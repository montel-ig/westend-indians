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
    return membersToArray(teams).map(team => {
      return <Team
        name={team.name}
      />
    });
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
    0: {name: "testTeam"},
    1: {name: "team Test"},
    2: {name: "testTest"}
  }
}

function createTeamBrowser(id) {
  ReactDOM.render(
    <TeamBrowser />,
    document.getElementById(id)
  );
}