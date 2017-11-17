class PlayerModal extends React.Component {
  constructor(props) {
    super()
    this.state = {visibility:"not-visible"}
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({visibility: "visible"});
    }.bind(this), 100);
  }

  render() {
    return (
      <div className={`modal-backdrop ${this.state.visibility}`} >
        <div className="modal-container">
          <ul className="modal-statics">
            <li>
              <div className="modal-img-wrapper">
                <img className="modal-img" src="http://i67.tinypic.com/29e4rqs.jpg"/>
              </div>
            </li>
            <li>
              <p id="player-number"># {this.props.selectedPlayer}</p>
              <p>Pelipaikka: {this.props.selectedPlayer.position}</p>
              <p>Kätisyys: {this.props.selectedPlayer.handedness}</p>
            </li>
          </ul>
          <ul className="modal-desc">
            <li>
              <p>Pituus</p>
            </li>
            <li>
              <p>Paino</p>
            </li>
            <li>
              <p>Syntymävuosi</p>
            </li>
          </ul>
          <div onClick={()=>{this.props.handlePlayerChange("next")}}>
            <i className="material-icons right" >navigate_next</i>
          </div>
          <div onClick={()=>{this.props.handlePlayerChange()}}>
            <i className="material-icons left" >navigate_before</i>
          </div>
        </div>
      </div>
    )
  }
}

