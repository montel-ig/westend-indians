class TeamModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
      selectedTeam:null,
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
    const { name, slug, description, contact_name, contact_email, contact_phone,
      leader_name, leader_email, leader_phone,image, some_instagram, some_twitter,
      some_facebook, some_snapchat, current_player_count, max_player_count,gender,
      path, sport, age_level, brochure, registration_link, short_description
    } = this.props.selectedTeam;
    return (
      <div className={`modal-backdrop ${this.state.visibilityClass}`} >
        <div className="team-modal-container">
          <p>✕</p>
          <div className="upper">
            <div className="modal-img-wrapper">
              <img className={`upper-team-img ${!image && "default-image"}`} src={image||this.props.default_image} />
            </div>
          </div>
          <div className="middle">
            <h2 className="team-title">{name}</h2>
            { short_description && <p className="desc-short">{short_description}</p> }
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
              { registration_link && <button onClick={()=>this.openPage(registration_link)}>Liity mukaan</button> }
              <button onClick={()=>this.openPage(`/joukkueet/${slug}`)}>Joukkueen sivulle</button>
              {brochure && <button onClick={()=>window.location.href=brochure}>Lataa esite</button> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

