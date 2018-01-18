const Player = (props) => {
  return (
    <div className="player-container" onClick={props.handlePlayerClick}>
      <div className="player-img-wrapper">
          <img className={`player-img ${props.image ? 'player-custopm' : 'player-default'} `} src={props.image||props.default_image} />
      </div>
      {//props.role && <p id="role"> {`#${props.role}`}</p>
      }
      <ul className="player-desc">
        <li>
          {props.number && <p id="player-number"> {`#${props.number}`}</p>}
        </li>
        <li>
          <p>{props.name}</p>
        </li>
      </ul>
    </div>
  )
};