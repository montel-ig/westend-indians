const Player = (props) => {
  return (
    <div className="player-container">
      <div className="player-img-wrapper">
        <img className="player-img" src="http://via.placeholder.com/500x750" />
      </div>
      <ul className="player-desc">
        <li>
          <p id="player-number"># {props.number}</p>
        </li>
        <li>
          <p>lorem ipsum</p>
          <p>Quisque lobortis lacus sed eros sollicitudin placerat</p>
        </li>
      </ul>
    </div>
  )
};