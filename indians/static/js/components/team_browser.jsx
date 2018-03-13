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
    <div className="teams-team-container card-parent" onClick={props.handleTeamClick}>
      <i className={`ribbon ${props.path}`}></i>
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
      hashUrl: [],
      selectedTeam: null
    };
    ['handleSelectChange',
      'handleChangedGender',
      'handleTeamClick',
      'handleModalClose',
      'onEscPress',
      'hashList'
    ].forEach((fn) => this[fn] = this[fn].bind(this));
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
    document.addEventListener("keydown", this.onEscPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscPress, false);
  }

  onEscPress(event) {
    if(event.keyCode === 27) {
      // close modal
      this.setState({selectedTeam:null});
    }
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
          handleTeamClick={() => {
            this.handleTeamClick(team)
          }}
          name={team.name}
          image={team.image}
          key={team.key}
          slug={team.slug}
          path={team.path}
        />
      }
    });
  }

  handleTeamClick(team) {
    this.setState({selectedTeam: team});
  }

  handleModalClose(e) {
    if (this.state.selectedTeam && e.target.className === "modal-backdrop visible") {
      this.setState({selectedTeam:null});
    }
  }

  hashList() {
    // parse url hash to a list of conditions
    return window.location.hash.split(',').map((h) => {
      if (h[0] === '#') {
        h = h.substr(1);
      }
      return h;
    });
  };



  teamInRange(team) {
    let teamInSelectedRange = true;
    let hashList = this.hashList();
    if (hashList) {
      // exclude team from results if all the conditions in hashList is not met
      hashList.map((value) => {
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
      console.log(selectedOption)
    } else {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: selectedOption.value}),
        hashUrl: [...this.state.hashUrl,selectedOption.value]
      });
    }
  }

  handleChangedGender(e) {
    if (e.target.value==='all') {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: null})});
    } else {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: e.target.value}),
        hashUrl: [...this.state.hashUrl,e.target.value]
      });
    }
  }

  render() {
    window.location.hash = this.state.hashUrl;
    return (
      <div className="teams-wrapper" onClick={this.handleModalClose}>
        { TeamFilter && <TeamFilter {...this.state}
          handleSelectChange={this.handleSelectChange}
          handleChangedGender={this.handleChangedGender}
        /> }
        {this.state.selectedTeam && <TeamModal
          selectedTeam={this.state.selectedTeam}
          default_image='/static/images/indians_logo_345x345.jpg'
        />}
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