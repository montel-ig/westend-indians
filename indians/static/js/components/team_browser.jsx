const Team = (props) => {
  return (
    <a href={`/joukkueet/${props.slug}`}>
      <div className="team-container">
        <img src="http://indiansproduction.s3.amazonaws.com/assets/logo-6cfd4cd67c604e09322045e30fad2986.jpg"/>
        <p>{props.name}</p>
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
        matinkylaOlari: false,
        espoonKeskus: false,
        espoonlahti: false,
        kauklahti: false,
        pohjoisEspoo: false,
        floorball: false,
        multiple: false,
        football: false,
        running: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let that = this;
    fetch('/teamsjson').then((response) => {
      return response.json();
    }).then(function(json) {
      that.setState({teams: json})
    });
  }

  mapTeams(teams) {
    return objectToArray(teams).map(team => {
      console.log(team);
      if (this.teamInChecked(team)) {
        return <Team
          name={team.name}
          key={team.key}
          slug={team.slug}
        />
      }
    });
  }

  teamInChecked(team) {
    let teamInCheckedTerms = false;
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