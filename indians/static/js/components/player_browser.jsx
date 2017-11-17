
class PlayerBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlayer: null
    }
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
  }

  handlePlayerClick(player) {
    this.setState({selectedPlayer: this.props.players[player]});
  }

  handlePlayerChange(player) {
    if (player) {
      this.setState(prevState => ({
        selectedPlayer: this.props.players[prevState.selectedPlayer + 1]
      }));
      return;
    }
    this.setState(prevState => ({
      selectedPlayer: this.props.players[prevState.selectedPlayer - 1]
    }));
  }

  handleModalClose(e) {
    if (this.state.selectedPlayer && e.target.className == "modal-backdrop visible") {
      this.setState({selectedPlayer:null});
    }
  }

  render() {
    return (
      <div className="player-wrapper" onClick={this.handleModalClose}>
        {this.state.selectedPlayer && <PlayerModal
          players = {this.props.players}
          selectedPlayer={this.state.selectedPlayer}
          handlePlayerChange={this.handlePlayerChange}
        />}
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.props.players.map((_, i) =>
          <Player
            number={i}
            handlePlayerClick={()=>{this.handlePlayerClick(i)}}
            key={i}
          />)}
        </div>
      </div>
    );
  }
}

PlayerBrowser.defaultProps = {
  players: Array.from(Array(15).keys())
}

function createPlayerBrowser(id) {
  ReactDOM.render(
    <PlayerBrowser />,
    document.getElementById(id)
  );
}
