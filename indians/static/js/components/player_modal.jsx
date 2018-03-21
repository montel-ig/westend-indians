class PlayerModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      visibilityClass:"not-visible",
      selectedPlayer:null,
      isEmployee: typeof props.selectedPlayer.role === 'string'
    };
    ['onArrowPress',
      'disableScrolling'
    ].forEach((fn) => this[fn] = this[fn].bind(this));
  }
  openPage(slug) {
    window.open(slug, '_blank');
  }

  getYoutubeId(url) {
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

  onArrowPress(event) {
    if(event.keyCode === 39 || event.type === 'swiped-right') {
      // next player
      this.props.handlePlayerChange("next", this.state.isEmployee);
    } else if (event.keyCode === 37 || event.type === 'swiped-left') {
      // previous player
      this.props.handlePlayerChange(false, this.state.isEmployee);
    }
  }

  disableScrolling() {
    document.body.style.overflow = "hidden";
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({visibilityClass: "visible"});
    }.bind(this), 100);
    document.addEventListener("keydown", this.onArrowPress, false);
    document.addEventListener('swiped-right', this.onArrowPress, false);
    document.addEventListener('swiped-left', this.onArrowPress, false);
    document.addEventListener('swiped-up', this.props.handleModalClose, false);
    document.addEventListener('swiped-down', this.props.handleModalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onArrowPress, false);
    document.removeEventListener('swiped-right', this.onArrowPress, false);
    document.removeEventListener('swiped-left', this.onArrowPress, false);
    document.removeEventListener('swiped-up', this.props.handleModalClose, false);
    document.removeEventListener('swiped-down', this.props.handleModalClose, false);
    document.body.style.overflow = "visible";
  }

  render() {
    const { first_name, last_name, origin, number, position, handedness, born, height, weight, school, role, video_url, description } = this.props.selectedPlayer;
    this.state.visibilityClass === 'visible' && this.disableScrolling();
    return (
      <div className={`player-modal-backdrop ${this.state.visibilityClass}`} >
        <div className={`player-modal-container ${video_url ? "wide" : "medium"}`}>
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
                <div className={video_url ? "line" : ""}>
                  <p>{first_name}</p>
                  <p> {last_name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            { role && <p className="position">{role}</p> }
            { position && <p className="position">{t('player_modal',position)}</p> }
            { handedness && <p>Pelaa {t('player_modal',handedness)}</p> }
            { height && <p>Pituus: {height} cm</p> }
            { weight && <p>Paino: {weight} kg</p> }
          </div>
          <div className="some">
            {this.props.selectedPlayer.some_instagram &&
              <a href={`https://www.instagram.com/${this.props.selectedPlayer.some_instagram}`} target="_blank"><svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z" fill="#fff"/></svg></a>}
            {this.props.selectedPlayer.some_snapchat &&
              <a href={`https://www.snapchat.com/add/${this.props.selectedPlayer.some_snapchat}`} target="_blank">
                <svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1408 1148q0-22-22-27-67-14-118-58t-80-109q-7-14-7-25 0-15 19.5-26t42.5-17 42.5-20.5 19.5-36.5q0-19-18.5-31.5t-38.5-12.5q-11 0-31 8t-32 8q-4 0-12-2 5-63 5-115 0-78-17-114-36-78-102.5-121.5t-152.5-43.5q-198 0-275 165-18 38-18 115 0 38 6 114-10 2-15 2-11 0-31.5-8t-30.5-8q-20 0-37.5 12.5t-17.5 32.5q0 21 19.5 35.5t42.5 20.5 42.5 17 19.5 26q0 11-7 25-64 138-198 167-22 5-22 27 0 47 138 69 2 5 6 26t11 30.5 23 9.5q13 0 38.5-5t38.5-5q35 0 67.5 15t54.5 32.5 57.5 32.5 76.5 15q43 0 79-15t57.5-32.5 54-32.5 67.5-15q13 0 39 4.5t39 4.5q15 0 22.5-9.5t11.5-31 5-24.5q138-22 138-69zm256-732v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z" fill="#fff"/></svg></a>}
            {this.props.selectedPlayer.some_twitter &&
              <a href={`https://twitter.com/${this.props.selectedPlayer.some_twitter}`} target="_blank"><svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1408 610q-56 25-121 34 68-40 93-117-65 38-134 51-61-66-153-66-87 0-148.5 61.5t-61.5 148.5q0 29 5 48-129-7-242-65t-192-155q-29 50-29 106 0 114 91 175-47-1-100-26v2q0 75 50 133.5t123 72.5q-29 8-51 8-13 0-39-4 21 63 74.5 104t121.5 42q-116 90-261 90-26 0-50-3 148 94 322 94 112 0 210-35.5t168-95 120.5-137 75-162 24.5-168.5q0-18-1-27 63-45 105-109zm256-194v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z" fill="#fff"/></svg></a>}
            {this.props.selectedPlayer.some_facebook &&
              <a href={`https://www.facebook.com/${this.props.selectedPlayer.some_facebook}`} target="_blank"><svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1376 128q119 0 203.5 84.5t84.5 203.5v960q0 119-84.5 203.5t-203.5 84.5h-188v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-532q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960z" fill="#fff"/></svg>
              </a>}
          </div>
          <div onClick={()=>{this.props.handlePlayerChange("next", this.state.isEmployee)}}>
            <svg className="icons right" width="64" height="56" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#fff"/></svg>
          </div>
          <div onClick={()=>{this.props.handlePlayerChange(false, this.state.isEmployee)}}>
            <svg className="icons left" width="55" height="64" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z" fill="#fff"/></svg>
          </div>
        </div>
      </div>
    )
  }
}

