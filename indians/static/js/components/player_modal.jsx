class PlayerModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
      selectedPlayer:null,
      isEmployee: typeof props.selectedPlayer.role === 'string'
    }
  }

  getYoutubeId(url){
    let ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({visibilityClass: "visible"});
    }.bind(this), 100);
  }

  render() {
    const { first_name, last_name, origin, number, position, handedness, born, height, weight, school, role, video_url, description } = this.props.selectedPlayer;
    return (
      <div className={`modal-backdrop ${this.state.visibilityClass}`} >
        <div className="modal-container">
          <div className="statistics-container">
            <div className="upper">
              <Player_introducing
                video_url={video_url && this.getYoutubeId(video_url)}
                image={this.props.selectedPlayer.image}
                default_image={'/static/images/indians_logo_345x345.jpg'}
              />
              <div className="statistics">
                <p id="player-name">{`${first_name} ${last_name}`}</p>
                { origin && <p>Kotoisin: {origin}</p> }
                { number && <p>Pelinumero: {number}</p> }
                { position && <p>Pelipaikka: {t('player_modal',position)}</p> }
                { handedness && <p>Kätisyys: {t('player_modal',handedness)}</p> }
                { born && <p>Syntymävuosi: {born}</p> }
                { height && <p>Pituus (cm): {height}</p> }
                { weight && <p>Paino (kg): {weight}</p> }
                { school && <p>Koulu: {school}</p> }
              </div>
            </div>
            <hr />
            <div className="lower">
              { role && <p>{role}</p> }
              <p>{description}</p>
            </div>
          </div>
          <ul className="modal-desc">
            {this.props.selectedPlayer.some_instagram &&
              <a href={`https://www.instagram.com/${this.props.selectedPlayer.some_instagram}`}><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_snapchat &&
              <a href={`https://www.snapchat.com/add/${this.props.selectedPlayer.some_snapchat}`}><i className="fa fa-snapchat-square fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_twitter &&
              <a href={`https://twitter.com/${this.props.selectedPlayer.some_twitter}`}><i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_facebook &&
              <a href={`https://www.facebook.com/${this.props.selectedPlayer.some_facebook}`}><i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a>}
          </ul>
          <div onClick={()=>{this.props.handlePlayerChange("next", this.state.isEmployee)}}>
            <i className="material-icons right size-125" >navigate_next</i>
          </div>
          <div onClick={()=>{this.props.handlePlayerChange(false, this.state.isEmployee)}}>
            <i className="material-icons left size-125" >navigate_before</i>
          </div>
        </div>
      </div>
    )
  }
}

