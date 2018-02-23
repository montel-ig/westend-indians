const Employee = (props) => (
  <div className="bottom">
    <div className="employee">
      <div className="role">
        {props.role && <p>{ props.role}</p>}
      </div>
      <div className="employee-name">
        <div>
          {props.name && <p>{props.name}</p>}
        </div>
      </div>
    </div>
  </div>
);

const Player = (props) => (
  <div className="bottom">
    <div className="number">
      { props.number && <p>#{props.number}</p> }
    </div>
    <div className="player-name">
      <div>
        {props.first_name && <p>{props.first_name}</p>}
        {props.last_name && <p> {props.last_name}</p>}
      </div>
    </div>
  </div>
);

const Person = (props) => {
  return (
    <div className="player-container" onClick={props.handlePlayerClick}>
      <div className="player-img-wrapper">
          <img className={`player-img ${props.image ? 'player-custom' : 'player-default'} `} src={props.image||props.default_image} />
      </div>
      <div className="desc-container">
        {props.number ?
          <Player {...props}/>
          :
          <Employee {...props}/>
        }
      </div>
    </div>
  )
};