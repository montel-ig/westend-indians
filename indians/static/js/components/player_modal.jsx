class PlayerModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
      locales: {
        "both": "molemmat",
        "left": "vasen",
        "right": "oikea",
        "fwd": "hyökkääjä",
        "goal": "maalivahti",
        "def": "puolustaja"
      }
    }
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({visibilityClass: "visible"});
    }.bind(this), 100);
  }

  render() {
    return (
      <div className={`modal-backdrop ${this.state.visibilityClass}`} >
        <div className="modal-container">
          <ul className="statistics-container">
            <li>
              <div className="modal-img-wrapper">
                <img className="modal-img" src="http://i67.tinypic.com/29e4rqs.jpg"/>
              </div>
            </li>
            <li className="statistics">
              <p id="player-name">{`${this.props.selectedPlayer.first_name} ${this.props.selectedPlayer.last_name}`}</p>
              <p>Kotoisin: {this.props.selectedPlayer.origin}</p>
              <p>Pelinumero: {this.props.selectedPlayer.number}</p>
              <p>Pelipaikka: {t('player_modal',this.props.selectedPlayer.handedness)}</p>
              <p>Kätisyys: {t('player_modal',this.props.selectedPlayer.handedness)}</p>
              <p>Syntymävuosi: {this.props.selectedPlayer.born}</p>
              <p>Pituus (cm): {this.props.selectedPlayer.height}</p>
              <p>Paino (kg): {this.props.selectedPlayer.weight}</p>
              <p>Koulu: {this.props.selectedPlayer.school}</p>
              <p>{this.props.selectedPlayer.description}</p>

            </li>
          </ul>
          <ul className="modal-desc">
            {this.props.selectedPlayer.some_instagram &&
              <a href={this.props.selectedPlayer.some_instagram}><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_snapchat &&
              <a href={this.props.selectedPlayer.some_snapchat}><i className="fa fa-snapchat-square fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_twitter &&
              <a href={this.props.selectedPlayer.some_twitter}><i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a>}
          </ul>
          <div onClick={()=>{this.props.handlePlayerChange("next")}}>
            <i className="material-icons right size-125" >navigate_next</i>
          </div>
          <div onClick={()=>{this.props.handlePlayerChange()}}>
            <i className="material-icons left size-125" >navigate_before</i>
          </div>
        </div>
      </div>
    )
  }
}

