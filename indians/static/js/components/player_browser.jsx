
class PlayerBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerModalVisible: false
    }
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

  }

  handlePlayerClick() {
    // attach/remove event handler
    if (!this.state.playerModalVisible) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      playerModalVisible: !prevState.playerModalVisible
    }));
  }
  
  handleOutsideClick(e) {
    // ignore clicks on the component itself, buggy
    
    /*
    if (this.node.contains(e.target)) {
      return;
    }
    */
    this.handlePlayerClick();
  }

  render() {
    return (
      <div className="player-wrapper" ref={node => { this.node = node; }}>
        {this.state.playerModalVisible && <PlayerModal  />}
        <div className={this.state.playerModalVisible ? "player-browser-root blurred" : "player-browser-root"}>
          {[...Array(15)].map((_, i) =>
          <Player
            number={i+1}
            handlePlayerClick={this.handlePlayerClick}
            key={i}
          />)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <PlayerBrowser />,
  document.getElementById('players')
);