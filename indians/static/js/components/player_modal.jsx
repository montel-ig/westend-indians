const PlayerModal = (props) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-img-wrapper">
          <img className="modal-img" src="http://via.placeholder.com/500x750" />
        </div>
        <ul className="modal-desc">
          <li>
            <p>Pituus</p>
          </li>
          <li>
            <p>Paino</p>
          </li>
          <li>
            <p>Ikä</p>
          </li>
        </ul>
      </div>
    </div>
  )
};

