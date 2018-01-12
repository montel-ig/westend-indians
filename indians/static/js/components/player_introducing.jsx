const Player_introducing = (props) => {
  return (
    <div className="modal-img-wrapper">
      {(() => {
        if (props.video_url) {
          return <iframe width="340"
                         height="420"
                         src={`https://www.youtube.com/embed/${props.video_url}?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&mute=1`}
                         frameborder="0" allow="autoplay; encrypted-media">
          </iframe>;
        } else if (props.image) {
          return <img className="modal-img player-custom" src={props.image}/>;
        }
        return <img className="modal-img player-default" src={props.default_image}/>;
      })()}
    </div>
  )
};