//const PlayerModal = (props) => {
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
    <div className={`${this.state.visibility} modal-backdrop`} onClick={this.props.handleModalClose}>
      <div className="modal-container">
        <ul className="modal-statics">
          <li>
            <div className="modal-img-wrapper">
              <img className="modal-img" src="http://i67.tinypic.com/29e4rqs.jpg"/>
            </div>
          </li>
          <li>
            <p id="player-number"># {this.props.playerNumber}</p>
            <p>Pelipaikka: ...</p>
            <p>Kätisyys: ...</p>
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
      </div>
    </div>
    )
  }
}

