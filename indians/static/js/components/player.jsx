const Player = (props) => {
  return (
    <div className="player-container" onClick={props.handlePlayerClick}>
      <div className="player-img-wrapper">
          <img className={`player-img ${props.image ? 'player-custopm' : 'player-default'} `} src={props.image||props.default_image} />
      </div>
      <ul className="player-desc">
        <li>
          <p id="player-number"> {`#${props.number}`}</p>
        </li>
        <li>
          <p>{props.name}</p>
        </li>
      </ul>
    </div>
  )
};