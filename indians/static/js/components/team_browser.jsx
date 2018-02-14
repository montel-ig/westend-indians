const replaceUmlauts = (string) => {
  let value;
  if (typeof string === 'string') {
    value = string.toLowerCase();
    value = value.replace(/ä/g, 'a');
    value = value.replace(/ö/g, 'o');
    value = value.replace(/[\s-.;,?%0-9]/, '');
  }
  return value;
};

const Team = (props) => {
  return (
    <a href={`/joukkueet/${props.slug}`}>
      <div className="teams-team-container">
        <div className="img-container">
          <img
            className={props.image ? "team-image" : "default-image"}
            src={props.image || '/static/images/indians_logo_345x345.jpg'}
          />
        </div>
        <div className="desc-container">
          <h3>{props.name}</h3>
        </div>
      </div>
    </a>
  )
};

class TeamBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedProperties: {
        selectedGender: null,
        selectedAge: null,
        selectedPath: null,
        selectedArea: null,
        selectedSport: null
      },
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChangedGender = this.handleChangedGender.bind(this);
  }

  componentDidMount() {
    let that = this;
    let url = '/api/v1/teams.json';
    let opts = {
      method: "GET",
      credentials: 'same-origin'
    };
    fetch(url,opts).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        return response.statusText;
      }
    }).then(function(teams) {
      that.setState({teams})
    });
  }

  mapTeams(teams) {
    return objectToArray(teams)
      .sort((a,b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      })
      .map(team => {
      if (this.teamInRange(team)) {
        return <Team
          name={team.name}
          image={team.image}
          key={team.key}
          slug={team.slug}
        />
      }
    });
  }

  teamInRange(team) {
    let teamInSelectedRange = true;
    if (team) {
      Object.values(this.state.selectedProperties).map((value) => {
        if (value) {
          //console.log(this.state.selectedProperties);
        }
        /*
        if (value && Object.values(team).indexOf(value) < 0) {
          console.log(Object.values(team))
          teamInSelectedRange = false;
        }
        */
        if (value && Object.values(team).map((p) => (replaceUmlauts(p)))
          .indexOf(value) < 0) {
            teamInSelectedRange = false;
          }
      });
    }
    return teamInSelectedRange;
  }

  handleSelectChange(selectedOption) {
    if (selectedOption.value==='all') {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: null})});
    } else {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: selectedOption.value})});
    }
  }

  handleChangedGender(e) {
    if (e.target.value==='all') {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: null})});
    } else {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: e.target.value})});
    }
  }

  render() {
    return (
      <div>
        { TeamFilter && <TeamFilter {...this.state}
          handleSelectChange={this.handleSelectChange}
          handleChangedGender={this.handleChangedGender}
        /> }
        <div className="team-browser-root">
          {this.mapTeams(this.state.teams)}
        </div>
      </div>
    );
  }
}

function createTeamBrowser(id) {
  ReactDOM.render(
    <TeamBrowser />,
    document.getElementById(id)
  );
}