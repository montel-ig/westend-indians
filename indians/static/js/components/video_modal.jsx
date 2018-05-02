class VideoModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      visibilityClass:"not-visible",
    }
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({visibilityClass: "visible"});
    }.bind(this), 100);
  }

  hide() {
    this.setState({visibilityClass: "not-visible"});
    setTimeout(function () {
      removeVideoModal()
    }.bind(this), 400);
  }

  render() {

    return (
      <div className={`modal-backdrop ${this.state.visibilityClass}`} onClick={this.hide.bind(this)}>
        <div className="video-modal-container">
          <p>✕</p>
          <iframe width="100%" height="100%" src={this.props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}

function showVideoModal(youtubeUrl) {
  ReactDOM.render(
    <VideoModal url={youtubeUrl} />,
    document.getElementById('video-modal-root')
  )
}

function removeVideoModal() {
  ReactDOM.unmountComponentAtNode(document.getElementById('video-modal-root'))
}