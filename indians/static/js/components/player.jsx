const Player = (props) => {
  return (
    <div className="player-container" onClick={props.handlePlayerClick}>
      <div className="player-img-wrapper">
        <img className="player-img" src="http://i67.tinypic.com/29e4rqs.jpg" />
      </div>
      <ul className="player-desc">
        <li>
          <p id="player-number"># {props.number}</p>
        </li>
        <li>
          <p>{props.name}</p>
        </li>
      </ul>
    </div>
  )
};