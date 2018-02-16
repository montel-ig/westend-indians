class TeamModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
      selectedTeam:null,
    }
  }

  openTeamPage(teamSlug) {
    window.open(`/joukkueet/${teamSlug}`, '_blank');
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
    const { name, slug, description, contact_name, contact_email, contact_phone,
      leader_name, leader_email, leader_phone,image, some_instagram, some_twitter,
      some_facebook, some_snapchat, current_player_count, max_player_count,gender,
      path, sport, age_level
    } = this.props.selectedTeam;
    const teamIsJoinable = () => (max_player_count > current_player_count) ;
    return (
      <div className={`modal-backdrop ${this.state.visibilityClass}`} >
        <div className="modal-container">
          <div className="upper">
            <div className="modal-img-wrapper">
              <img className={`upper-team-img ${!image && "default-image"}`} src={image||this.props.default_image} />
            </div>
          </div>
          <div className="middle">
            <h2 className="team-title">{name}</h2>
          </div>
          <div className="lower">
            <div className="lower-left">
              <div className="lower-left-upper">
                <div className="team-leader">
                  { contact_name && <p className="title">Joukkueen johtaja:</p> }
                  { contact_name && <p>{contact_name}</p> }
                  { contact_email && <p>{contact_email}</p> }
                  { contact_phone && <p>{contact_phone}</p> }
                </div>
              </div>
              <div className="lower-left-lower">
                <div className="team-contact">
                  { leader_name && <p className="title">Seuran urheiluvastaava:</p> }
                  { leader_name && <p>{leader_name}</p> }
                  { leader_email && <p>{leader_email}</p> }
                  { leader_phone && <p>{leader_phone}</p> }
                </div>
              </div>
            </div>
            <div className="lower-right">
              <button onClick={()=>this.openTeamPage(slug)} disabled={!teamIsJoinable}>{teamIsJoinable && "Liity mukaan"}</button>
              <button onClick={()=>this.openTeamPage(slug)}>Joukkueen sivulle</button>
              <a href={`/joukkueet/${slug}`}>Lisätietoja</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

