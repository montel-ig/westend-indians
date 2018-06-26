const registryInquiryUrl = 'http://www.westendindians.fi/tiedustelu?no_layout=true'

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

const NoResults = (props) => (
  <div className="no-results">
    <h2>Ei löytynyt sopivia joukkueita</h2>
    <p>Ei hätää. Lähetä meille linkistä vapaa tiedustelu ja etsimme sopivaa tekemistä sinulle tai lapsellesi.</p>
    <button onClick={() => (window.open(registryInquiryUrl, '_blank'))}>TIEDUSTELULOMAKKEESEEN</button>
  </div>
);

const PathInfo = () => (
  <div className="path-info">
    <p>
      <span>
        <svg id="harrastajan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
      </span>Harrastajan polku
    </p>
    <p>
      <span>
        <svg id="kilpailijan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
      </span>Kilpailijan polku
    </p>
    <p>
      <span>
        <svg id="urheilijan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
      </span>Urheilijan polku
    </p>
  </div>
);

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
        gender: null,
        age_level: null,
        path: null,
        area_name: null,
        sport: null,
        team: null
      },
      hashUrl: this.hashList(),
    };
    ['handleSelectChange',
      'handleChangedGender',
      'handleSelectedTeam',
      'handleModalClose',
      'onEscPress',
      'hashList',
      'updateHashUrl',
      'setInitialDropDownValues',
      'setTeamFromHash',
      'teamIsAmateur'
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
      that.setState({teams});
      that.setInitialDropDownValues();
      that.setTeamFromHash()
    });
    document.addEventListener("keydown", this.onEscPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscPress, false);
  }

  setInitialDropDownValues() {
    // set dropdown values from hash on component mount
    const hashList = this.hashList();
    let selectedProperties = this.state.selectedProperties;
    Object.entries(hashList).map((h) => {
      selectedProperties[h[1][0]] = h[1][1]
    });
    this.setState({ selectedProperties });
  }

  setTeamFromHash() {
    const hashList = this.hashList();
    // if team is set in hash, find and assign the corresponding team
    Object.values(hashList).map((h) => {
      if (h[0]==='team') {
        this.setState({
          selectedProperties: Object.assign({},
            this.state.selectedProperties,
            {team: this.state.teams.find((team) => (team.slug === h[1]))})
        });
      }
    });
  }

  onEscPress(event) {
    if(event.keyCode === 27) {
      // close modal with no parameters
      this.handleSelectedTeam();
    }
  }

  mapTeams(teams) {
    const filteredteams = objectToArray(teams)
      .sort((a,b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      })
      .filter(team => this.teamInRange(team))
      .map((team) => (
        <Team
          handleTeamClick={() => (
            this.handleSelectedTeam(team)
          )}
          name={team.name}
          image={team.image}
          key={team.key}
          slug={team.slug}
          path={team.path}
        />
      )
    );
    if (filteredteams.length < 1 && !this.state.selectedProperties.team) {
      return <NoResults />
    }
    return filteredteams
  }

  handleModalClose(e) {
    if (this.state.selectedProperties.team && e.target.className === "modal-backdrop visible") {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, {team: null})
      },() => { this.updateHashUrl() });
    }
  }

  hashList() {
    // parse hash to a list of conditions
    return window.location.hash
      .substr(1)
      .split(',')
      .map((a) => (a.split('=')));
  };

  updateHashUrl() {
    // compose hash from selected properties
    const hashUrl = Object.entries(this.state.selectedProperties)
                    .filter((p) => (p[1]))
                    .map((p) => (`${p[0]}=${p[1]}`));
    if (hashUrl.length === 0) {
      hashUrl.push('all');
    }
    window.location.hash = hashUrl
    this.setState({ hashUrl })
  }

  teamIsAmateur(team) {
    // gum fix to include team in query if the condition is "harrastajan" and team is not "kilpailijan" or "Urheilijan
    // Todo: Fix properly in V2!

    const exceptions = ['urheilijan', 'kilpailijan'];
    const teamPath = team.path;
    return !exceptions.includes(teamPath);
  }

  teamInRange(team) {
    // exclude team from results if all the conditions in hashList have not met
    let teamInSelectedRange = true;
    if (team.visible === false) teamInSelectedRange = false;
    let hashList = this.hashList();
    if (hashList) {
      hashList.map((value) => {
        if (value[1] === 'harrastajan' && this.teamIsAmateur(team)) {
          return true;
        } else if (value && value !== 'all' && Object.values(team)
            .map((p) => (replaceUmlauts(p)))
            .indexOf(value[1]) < 0) {
          teamInSelectedRange = false;
        }
      });
    }
    return teamInSelectedRange;
  }

  handleSelectedTeam(team) {
    if (!team) {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {team: null})},
        () => { this.updateHashUrl() });
    } else {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, { team: team.slug }),
      }, () => {
        this.updateHashUrl();
        this.setTeamFromHash()
      });
    }
  }

  handleSelectChange(selectedOption) {
    if (selectedOption.value==='all') {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: null})},
        () => { this.updateHashUrl() });
    } else {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: selectedOption.value})
      },() => { this.updateHashUrl() });
    }
  }

  handleChangedGender(e) {
    if (e.target.value==='all') {
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {gender: null})},
        () => { this.updateHashUrl() });
    } else {
      this.setState({
        selectedProperties: Object.assign({}, this.state.selectedProperties, {gender: e.target.value}),
      }, () => { this.updateHashUrl() });
    }
  }

  render() {
    return (
      <div className="teams-wrapper" onClick={this.handleModalClose}>
        { TeamFilter && <TeamFilter {...this.state}
          handleSelectChange={this.handleSelectChange}
          handleChangedGender={this.handleChangedGender}
        /> }
        {this.state.selectedProperties.team && <TeamModal
          selectedTeam={this.state.selectedProperties.team}
          default_image='/static/images/indians_logo_345x345.jpg'
        />}
        <PathInfo/>
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