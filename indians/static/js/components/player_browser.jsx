
class PlayerBrowser extends React.Component {
  constructor(props) {
    super(props);
    ['mapPlayers',
      'handleModalClose',
     'handlePlayerClick',
     'handlePlayerChange'
    ].forEach((fn) => this[fn] = this[fn].bind(this));

    this.state = {
      selectedPlayer: null,
    }
  }

  mapPlayers(players) {
    console.log(players);
    return Object.keys(players).map(playerIndex => {
      let player = players[playerIndex];
      return <Player
        name={`${player.first_name} ${player.last_name}`}
        origin={player.origin}
        number={player.number}
        position={player.position}
        born={player.born}
        handedness={player.handedness}
        height={player.height}
        weight={player.weight}
        //years_combined
        school={player.school}
        some_facebook={player.some_facebook}
        some_instagram={player.some_instagram}
        some_snapchat={player.some_snapchat}
        some_twitter={player.some_twitter}
        handlePlayerClick={()=>{this.handlePlayerClick(player)}}
        key={player.number}
      />
    });
  }


  handlePlayerClick(player) {
    this.setState({selectedPlayer: player});
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
          {this.mapPlayers(this.props.players)}
        </div>

      </div>
    );
  }
}

PlayerBrowser.defaultProps = {
  players: team_members
  //players: Array.from(Array(15).keys())
}

function createPlayerBrowser(id) {

  ReactDOM.render(
    <PlayerBrowser />,
    document.getElementById(id)
  );
}
