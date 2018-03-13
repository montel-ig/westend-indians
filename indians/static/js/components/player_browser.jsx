const positions = {
  forward: 'fwd',
  defense: 'def',
  goal: 'goalie',
  coach: 'coach',
  support: 'support',
  player: 'player'
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
      'findOrphanedIndians'
    ].forEach((fn) => this[fn] = this[fn].bind(this));

    this.state = {
      forwards: this.filterByPosition(objectToArray(team_members), 'fwd'),
      defenses: this.filterByPosition(objectToArray(team_members), 'def'),
      goalies: this.filterByPosition(objectToArray(team_members), 'goalie'),
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
    if (Object.values(positions).indexOf(predicate) > -1) {
      return players.filter((p) => (p.position === predicate));
    }
  }

  findOrphanedIndians(players) {
    return players.filter((p) => (!p.position));
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
          handlePlayerClick={() => {
            this.handlePlayerClick(player)
          }}
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
        key={employee.key}
      />
    });
  }


  handlePlayerClick(player) {
    this.setState({selectedPlayer: player});
  }

  handlePlayerChange(person, isEmployee) {
    let indiansToIterate = isEmployee === true ? this.state.employees : this.state.players;
    if (person) {
      this.setState(function(prevState) {
        if (indiansToIterate.indexOf(this.state.selectedPlayer)+1 === indiansToIterate.length) {
          return {
            selectedPlayer: indiansToIterate[0]
          };
        } else {
          return {
            selectedPlayer: indiansToIterate[indiansToIterate.indexOf(this.state.selectedPlayer)+1]
          };
        }
      });
    } else {
      this.setState(function(prevState) {
        if (indiansToIterate.indexOf(this.state.selectedPlayer) === 0) {
          return {
            selectedPlayer: indiansToIterate[indiansToIterate.length-1]
          };
        } else {
          return {
            selectedPlayer: indiansToIterate[indiansToIterate.indexOf(this.state.selectedPlayer)-1]
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
    return (
      <div className="player-wrapper" onClick={this.handleModalClose}>
        {this.state.selectedPlayer && <PlayerModal
          players={this.state.players}
          employees={this.state.employees}
          selectedPlayer={this.state.selectedPlayer}
          handlePlayerChange={this.handlePlayerChange}
        />}
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.forwards.length > 0 && <h1>Hyökkääjät</h1>}
          <div>
            { this.mapPlayers(this.state.forwards) }
          </div>
        </div>
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.defenses.length > 0 && <h1>Puolustajat</h1>}
          <div>
            { this.mapPlayers(this.state.defenses) }
          </div>
        </div>
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.goalies.length > 0 && <h1>Maalivahdit</h1>}
          <div>
            {this.mapPlayers(this.state.goalies)}
          </div>
        </div>
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.coaches.length > 0 && <h1>Valmentajat</h1>}
          <div>
            {this.mapEmployees(this.state.coaches)}
          </div>
        </div>
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.support.length > 0 && <h1>Toimihenkilöt</h1>}
          <div>
            {this.mapEmployees(this.state.support)}
          </div>
        </div>
        <div className={this.state.selectedPlayer ? "player-browser-root blurred" : "player-browser-root"}>
          {this.state.other.length > 0 && <h1>Muut</h1>}
          <div>
            {this.mapEmployees(this.state.other)}
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
