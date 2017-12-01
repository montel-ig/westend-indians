class PlayerModal extends React.Component {
  constructor(props) {
    super()
    this.state = {visibilityClass:"not-visible"}
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
          <ul className="modal-statics">
            <li>
              <div className="modal-img-wrapper">
                <img className="modal-img" src="http://i67.tinypic.com/29e4rqs.jpg"/>
              </div>
            </li>
            <li>
              <p id="player-name">{`${this.props.selectedPlayer.first_name} ${this.props.selectedPlayer.last_name}`}</p>
              <p>Kotoisin: {this.props.selectedPlayer.origin}</p>
              <p>Pelinumero: {this.props.selectedPlayer.number}</p>
              <p>Pelipaikka: {this.props.selectedPlayer.position}</p>
              <p>Kätisyys: {this.props.selectedPlayer.handedness}</p>
              <p>Syntymävuosi: {this.props.selectedPlayer.born}</p>
              <p>Pituus (cm): {this.props.selectedPlayer.height}</p>
              <p>Paino (kg): {this.props.selectedPlayer.weight}</p>
              <p>Koulu: {this.props.selectedPlayer.school}</p>
              {this.props.selectedPlayer.some_instagram &&
                <p>Instagram: {this.props.selectedPlayer.some_instagram}</p>}
              {this.props.selectedPlayer.some_snapchat &&
                <p>Snapchat: {this.props.selectedPlayer.some_snapchat}</p>}
              {this.props.selectedPlayer.some_snapchat &&
                <p>Twitter: {this.props.selectedPlayer.some_twitter}</p>}
              <p>{this.props.selectedPlayer.description}</p>

            </li>
          </ul>
          <ul className="modal-desc">

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

