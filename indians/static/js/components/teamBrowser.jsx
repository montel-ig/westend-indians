class TeamBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
}

function createPlayerBrowser(id) {
  ReactDOM.render(
    <TeamBrowser />,
    document.getElementById(id)
  );
}