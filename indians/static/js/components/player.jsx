const Player = (props) => {
  return (
    <div className="player-container" onClick={props.handlePlayerClick}>
      <div className="player-img-wrapper">
          <img className={`player-img ${props.image ? 'player-custom' : 'player-default'} `} src={props.image||props.default_image} />
      </div>
      <div className="desc-container">
        {props.role && <p className="role"> {`${props.role}`}</p>}
        <ul className="player-desc">
          <li>
            {props.number && <p className="player-number"> {`#${props.number}`}</p>}
          </li>
          <li className={props.role ? "employee" : "player"}>
            <p>{props.name}</p>
          </li>
        </ul>
      </div>
    </div>
  )
};