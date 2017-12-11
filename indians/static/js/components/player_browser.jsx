
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
    return players.map(player => {
      return <Player
        name={`${player.first_name} ${player.last_name}`}
        origin={player.origin}
        number={player.number}
        position={player.position}
        born={player.born}
        handedness={player.handedness}
        height={player.height}
        weight={player.weight}
        //todo: years_combined
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
      console.log(this.props.players.indexOf(this.state.selectedPlayer), this.props.players.length)
      this.setState(function(prevState) {
        if (this.props.players.indexOf(this.state.selectedPlayer)+1 === this.props.players.length) {
          return {
            selectedPlayer: this.props.players[0]
          };
        } else {
          return {
            selectedPlayer: this.props.players[this.props.players.indexOf(this.state.selectedPlayer)+1]
          };
        }

      });
    } else {
      this.setState(function(prevState) {
        if (this.props.players.indexOf(this.state.selectedPlayer) === 0) {
          return {
            selectedPlayer: this.props.players[this.props.players.length-1]
          };
        } else {
          return {
            selectedPlayer: this.props.players[this.props.players.indexOf(this.state.selectedPlayer)-1]
          };
        }

      });
    }
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
  players: membersToArray(team_members)
}

function createPlayerBrowser(id) {

  ReactDOM.render(
    <PlayerBrowser />,
    document.getElementById(id)
  );
}
