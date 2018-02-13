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
          <img src={props.image}/>
        </div>
        <h3>{props.name}</h3>
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
      male: false,
      female: false,
      fixed: false,
      i: false,
      h: false,
      g: false,
      f: false,
      e: false,
      d: false,
      c: false,
      b: false,
      a:false,
      adult: false,
      activityLvlOne: false,
      activityLvlTwo: false,
      activityLvlThree: false,
      activityLvlOverThree: false,
      urheilijan: false,
      kilpailijan: false,
      harrastajan: false,
      salibandy_koulut: false,
      koulujen_iltapaivatoiminta: false,
      erityisryhmat: false,
      tapiola: false,
      leppavaara: false,
      matinkylaolari: false,
      espoonkeskus: false,
      espoonlahti: false,
      kauklahti: false,
      pohjoisespoo: false,
      floorball: false,
      multiple: false,
      football: false,
      running: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangedState = this.handleChangedState.bind(this);
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
    return objectToArray(teams).map(team => {
      if (this.teamInChecked(team)) {
        return <Team
          name={team.name}
          image={team.image}
          key={team.key}
          slug={team.slug}
        />
      }
    });
  }

  teamInChecked(team) {
    let teamInCheckedTerms = false;
    if (team) {
      Object.values(this.state.selectedProperties).map((value) => {
        Object.values(team).map((teamValue) => {
          if (value !== null && replaceUmlauts(value) === replaceUmlauts(teamValue)) {
            teamInCheckedTerms = true;
          }
        });
      });
    }
    return teamInCheckedTerms;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [replaceUmlauts(name)]: value
    });
  }

  handleChangedState(selectedOption) {
    //console.log([selectedOption]);
    if (!selectedOption) {
      this.setState({})
    }
    this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {[selectedOption.property]: selectedOption.value})});
  }

  handleChangedGender(e) {
    e.target.value==='all'
      &&
      this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: null})});
    this.setState({selectedProperties: Object.assign({}, this.state.selectedProperties, {selectedGender: e.target.value})});
  }

  render() {
    console.log(this.state.selectedProperties.selectedGender);

    return (
      <div>
        { TeamFilter && <TeamFilter {...this.state}
          handleChangedState={this.handleChangedState}
          handleInputChange={this.handleInputChange}
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