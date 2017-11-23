class TeamBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="team-browser-root">
        <TeamFilter />
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