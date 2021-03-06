const Player_introducing = (props) => {
  return (
    <div className="modal-img-wrapper">
      {(() => {
        if (props.video_url) {
          return <iframe width="600"
                         height="400"
                         src={`https://www.youtube.com/embed/${props.video_url}?rel=0&amp;controls=1&amp;showinfo=0&autoplay=1&mute=0%loop=1`}
                         frameBorder="0" allow="autoplay; encrypted-media">
          </iframe>;
        } else if (props.image) {
          return <img className="modal-img player-custom" src={props.image}/>;
        }
        return <img className="modal-img player-default" src={props.default_image}/>;
      })()}
    </div>
  )
};