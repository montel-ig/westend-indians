
class PlayerBrowser extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      selectedPlayer: null
    }
    this.handleModalClose =this.handleModalClose.bind(this);
  }

  handlePlayerClick(player) {
    this.setState({
      selectedPlayer: this.props.players[player]
    });
  }

  handleModalClose() {
    this.setState({selectedPlayer:null})
  }


  render() {
    return (
      <div className="player-wrapper">
        {this.state.selectedPlayer && <PlayerModal playerNumber={this.state.selectedPlayer} handleModalClose={this.handleModalClose} />}
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
