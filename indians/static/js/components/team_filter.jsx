const TeamFilter = () => {
  return (
    <div className="team-filter">
      <div className='select-age'>
        <label>Ikä:</label>
        <select>
            <option value="8-10">8-10</option>
            <option value="10-12">10-12</option>
            <option value="12-15">12-15</option>
          </select>
      </div>
      <div className='select-level'>
        <label>Taso:</label>
        <select>
          <option value="junior">junior</option>
          <option value="senior">senior</option>
          <option value="pro">pro</option>
        </select>
      </div>
      <div className='select-train'>
        <label>Kerrat:</label>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="> 3"> 3</option>
        </select>
      </div>
    </div>
  );
}