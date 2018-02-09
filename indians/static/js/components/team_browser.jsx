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
  }

  componentDidMount() {
    let that = this;
    let url = '/api/v1/teams.json';
    let opts = {
      method: "GET",
      credentials: 'same-origin'
    }
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
      Object.values(team).filter((property) => {
        if (this.state.hasOwnProperty(replaceUmlauts(property)) && this.state[replaceUmlauts(property)]) {
          teamInCheckedTerms = true
        }
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

  render() {
    return (
      <div>
        { TeamFilter && <TeamFilter {...this.state} handleInputChange={this.handleInputChange} /> }
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