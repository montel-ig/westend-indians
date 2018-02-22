class PlayerModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
      selectedPlayer:null,
      isEmployee: typeof props.selectedPlayer.role === 'string'
    }
  }
  openPage(slug) {
    window.open(slug, '_blank');
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
      <div className={`player-modal-backdrop ${this.state.visibilityClass}`} >
        <div className="player-modal-container">
          <div className="upper">
            <Player_introducing
              video_url={video_url && this.getYoutubeId(video_url)}
              image={this.props.selectedPlayer.image}
              default_image={'/static/images/indians_logo_345x345.jpg'}
            />
            <div className="middle">
              <div className={"number"}>
                { number && <p>#{number}</p> }
              </div>
              <div className="name">
                <div>
                  <p>{first_name}</p>
                  <p> {last_name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            { role && <p className="position">{role}</p> }
            { position && <p className="position">{t('player_modal',position)}</p> }
            { handedness && <p>Kätisyys: {t('player_modal',handedness)}</p> }
            { height && <p>Pituus (cm): {height}</p> }
            { weight && <p>Paino (kg): {weight}</p> }
          </div>
          <div className="some">
            {this.props.selectedPlayer.some_instagram &&
              <a href={`https://www.instagram.com/${this.props.selectedPlayer.some_instagram}`} target="_blank"><i className="fab fa-instagram fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_snapchat &&
              <a href={`https://www.snapchat.com/add/${this.props.selectedPlayer.some_snapchat}`} target="_blank"><i className="fab fa-snapchat-square fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_twitter &&
              <a href={`https://twitter.com/${this.props.selectedPlayer.some_twitter}`} target="_blank"><i className="fab fa-twitter-square fa-2x" aria-hidden="true"></i></a>}
            {this.props.selectedPlayer.some_facebook &&
              <a href={`https://www.facebook.com/${this.props.selectedPlayer.some_facebook}`} target="_blank"><i className="fab fa-facebook-square fa-2x" aria-hidden="true"></i></a>}
          </div>
          <div onClick={()=>{this.props.handlePlayerChange("next", this.state.isEmployee)}}>
            <i className="icons right fas fa-arrow-right fa-4x"></i>
          </div>
          <div onClick={()=>{this.props.handlePlayerChange(false, this.state.isEmployee)}}>
            <i className="icons left fas fa-arrow-left fa-4x"></i>
          </div>
        </div>
      </div>
    )
  }
}

