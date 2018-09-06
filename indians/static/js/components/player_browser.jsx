const POSITIONS = {
  positions: {
    forward: 'fwd',
    defense: 'def',
    goal: 'goal',
    coach: 'coach',
    support: 'support',
    player: 'player'
  },
  types: {
    fwd: 'forwards',
    def: 'defenses',
    goal: 'goalies',
    coach: 'coaches',
    support: 'support',
  }


};

class PlayerBrowser extends React.Component {
  constructor(props) {
    super(props);
    ['mapPlayers',
     'handleModalClose',
     'handlePlayerClick',
     'handlePlayerChange',
      'onEscPress',
      'filterByPosition',
      'findOrphanedIndians',
      'getPlayerType'
    ].forEach((fn) => this[fn] = this[fn].bind(this));

    this.state = {
      team: objectToArray(team_members).sort((a,b) => a.number - b.number),
      forwards: this.filterByPosition(objectToArray(team_members), 'fwd'),
      defenses: this.filterByPosition(objectToArray(team_members), 'def'),
      goalies: this.filterByPosition(objectToArray(team_members), 'goal'),
      coaches: this.filterByPosition(objectToArray(team_members), 'coach'),
      support: this.filterByPosition(objectToArray(team_members), 'support'),
      other: this.findOrphanedIndians(objectToArray(team_members)),
      selectedPlayer: null,
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onEscPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscPress, false);
  }

  onEscPress(event) {
    if(event.keyCode === 27) {
      // close modal
      this.setState({selectedPlayer:null});
    }
  }

  filterByPosition(players,predicate) {
    if (Object.values(POSITIONS.positions).indexOf(predicate) > -1) {
      return players.filter((p) => (p.position === predicate));
    }
  }

  getPlayerType(pos) {
    return POSITIONS.types[pos];
  }

  findOrphanedIndians(players) {
    return players.filter((p) => (!p.position || p.position === 'player'));
  }

  mapPlayers(players) {
    return players
      .sort((a,b) => a.number - b.number)
      .map(player => {
      if (!player.role) {
        return <Person
          name={`${player.first_name} ${player.last_name}`}
          first_name={player.first_name}
          last_name={player.last_name}
          origin={player.origin}
          number={player.number}
          position={player.position}
          role={player.role}
          image={player.image}
          default_image='/static/images/indians_logo_345x345.jpg'
          born={player.born}
          handedness={player.handedness}
          height={player.height}
          weight={player.weight}
          school={player.school}
          some_facebook={player.some_facebook}
          some_instagram={player.some_instagram}
          some_snapchat={player.some_snapchat}
          some_twitter={player.some_twitter}
          video_url={player.video_url}
          handlePlayerClick={()=>{this.handlePlayerClick(player)}}
          handleModalClose={this.handleModalClose}
          key={player.key}
        />
      }
    });
  }

  mapEmployees(employees) {
    return employees
      .map(employee => {
      return <Person
        name={`${employee.first_name} ${employee.last_name}`}
        origin={employee.origin}
        role={employee.role}
        image={employee.image}
        default_image='/static/images/indians_logo_345x345.jpg'
        born={employee.born}
        height={employee.height}
        weight={employee.weight}
        some_facebook={employee.some_facebook}
        some_instagram={employee.some_instagram}
        some_snapchat={employee.some_snapchat}
        some_twitter={employee.some_twitter}
        video_url={employee.video_url}
        handlePlayerClick={()=>{this.handlePlayerClick(employee)}}
        handleModalClose={this.handleModalClose}
        key={employee.key}
      />
    });
  }


  handlePlayerClick(player) {
    this.setState({selectedPlayer: player});
  }

  handlePlayerChange(person, isEmployee) {
    const playerType = this.getPlayerType(this.state.selectedPlayer.position);
    const indians = this.state[playerType];

    if (person) {
      this.setState(function(prevState) {
        if (indians.indexOf(this.state.selectedPlayer)+1 === indians.length) {
          return {
            selectedPlayer: indians[0]
          };
        } else {
          return {
            selectedPlayer: indians[indians.indexOf(this.state.selectedPlayer)+1]
          };
        }
      });
    } else {
      this.setState(function(prevState) {
        if (indians.indexOf(this.state.selectedPlayer) === 0) {
          return {
            selectedPlayer: indians[indians.length-1]
          };
        } else {
          return {
            selectedPlayer: indians[indians.indexOf(this.state.selectedPlayer)-1]
          };
        }
      });
    }
  }

  handleModalClose(e) {
    if (this.state.selectedPlayer && e.target.className === "player-modal-backdrop visible") {
      this.setState({selectedPlayer:null});
    }
  }

  render() {
    const { selectedPlayer, players, employees, forwards, defenses, goalies, coaches, support, other } = this.state;

    return (
      <div className="player-wrapper" onClick={this.handleModalClose}>
        {selectedPlayer && <PlayerModal
          players={players}
          employees={employees}
          selectedPlayer={selectedPlayer}
          handlePlayerChange={this.handlePlayerChange}
        />}
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {forwards.length > 0 && <h1>Hyökkääjät</h1>}
          <div>
            { this.mapPlayers(forwards) }
          </div>
        </div>
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {defenses.length > 0 && <h1>Puolustajat</h1>}
          <div>
            { this.mapPlayers(defenses) }
          </div>
        </div>
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {goalies.length > 0 && <h1>Maalivahdit</h1>}
          <div>
            {this.mapPlayers(goalies)}
          </div>
        </div>
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {coaches.length > 0 && <h1>Valmentajat</h1>}
          <div>
            {this.mapEmployees(coaches)}
          </div>
        </div>
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {support.length > 0 && <h1>Toimihenkilöt</h1>}
          <div>
            {this.mapEmployees(support)}
          </div>
        </div>
        <div className={selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {other.length > 0 && <h1>Muut</h1>}
          <div>
            {this.mapEmployees(other)}
          </div>
        </div>
      </div>
    );
  }
}

function createPlayerBrowser(id) {
  ReactDOM.render(
    <PlayerBrowser />,
    document.getElementById(id)
  );
}
