const TeamFilter = (props) => {
  return (
    <div className="team-filter">
      <div className='select-age'>
        <p>Ikä</p>
        <label>
          <input
            name="ages8to10"
            type="checkbox"
            checked={props.ages8to10}
            onChange={props.handleInputChange} />
          8-10
        </label>
        <label>

          <input
            name="ages10to12"
            type="checkbox"
            checked={props.ages10to12}
            onChange={props.handleInputChange} />
          10-12
        </label>
        <label>
          <input
            name="ages12to15"
            type="checkbox"
            checked={props.ages12to15}
            onChange={props.handleInputChange} />
          12-15
        </label>
      </div>
      <div className='select-activity-lvl'>
        <p>Kerrat viikossa</p>
        <label>
          <input
            name="activityLvlOne"
            type="checkbox"
            checked={props.activityLvlOne}
            onChange={props.handleInputChange} />
          1
        </label>
        <label>
          <input
            name="activityLvlTwo"
            type="checkbox"
            checked={props.activityLvlTwo}
            onChange={props.handleInputChange} />
          2
        </label>
        <label>
        <input
          name="activityLvlThree"
          type="checkbox"
          checked={props.activityLvlThree}
          onChange={props.handleInputChange} />
          3
        </label>
        <label>
          <input
            name="activityLvlOverThree"
            type="checkbox"
            checked={props.activityLvlOverThree}
            onChange={props.handleInputChange} />
          > 3
        </label>
      </div>
      <div className='select-path'>
        <p>Polku</p>
        <label>
          <input
            name="athletePath"
            type="checkbox"
            checked={props.athletePath}
            onChange={props.handleInputChange} />
          Urheilijan polku (+3 tapahtumaa)
        </label>
        <label>
          <input
            name="competitorPath"
            type="checkbox"
            checked={props.competitorPath}
            onChange={props.handleInputChange} />
          Kilpailijan polku (3-2 tapahtumaa)
        </label>
        <label>
          <input
            name="amateurPath"
            type="checkbox"
            checked={props.amateurPath}
            onChange={props.handleInputChange} />
          Harrastajan polku (1 tapahtuma)
        </label>
        <label>
          <input
            name="floorballSchools"
            type="checkbox"
            checked={props.floorballSchools}
            onChange={props.handleInputChange} />
          Salibandykoulut (1, 2 tai 3 tapahtumaa)
        </label>
        <label>
          <input
            name="afternoonActivities"
            type="checkbox"
            checked={props.afternoonActivities}
            onChange={props.handleInputChange} />
          Koulujen iltapäivätoiminta (1 tai 2 tapahtumaa)
        </label>
        <label>
          <input
            name="specialGroups"
            type="checkbox"
            checked={props.specialGroups}
            onChange={props.handleInputChange} />
          Erityisryhmät
        </label>
      </div>
      <div className='select-area'>
        <p>Alueet</p>
        <label>
          <input
            name="tapiola"
            type="checkbox"
            checked={props.tapiola}
            onChange={props.handleInputChange} />
          Tapiola
        </label>
        <label>
          <input
            name="leppavaara"
            type="checkbox"
            checked={props.leppavaara}
            onChange={props.handleInputChange} />
          Leppävaara
        </label>
        <label>
          <input
            name="matinkylaOlari"
            type="checkbox"
            checked={props.matinkylaOlari}
            onChange={props.handleInputChange} />
          Matinkylä-Olari
        </label>
        <label>
          <input
            name="espoonKeskus"
            type="checkbox"
            checked={props.espoonKeskus}
            onChange={props.handleInputChange} />
          Espoon keskus
        </label>
        <label>
          <input
            name="espoonlahti"
            type="checkbox"
            checked={props.espoonlahti}
            onChange={props.handleInputChange} />
          Espoonlahti
        </label>
        <label>
          <input
            name="kauklahti"
            type="checkbox"
            checked={props.kauklahti}
            onChange={props.handleInputChange} />
          Kauklahti
        </label>
        <label>
          <input
            name="pohjoisEspoo"
            type="checkbox"
            checked={props.pohjoisEspoo}
            onChange={props.handleInputChange} />
          Pohjois-Espoo
        </label>
      </div>
      <div className='select-sport'>
        <p>Laji</p>
        <label>
          <input
            name="floorball"
            type="checkbox"
            checked={props.floorball}
            onChange={props.handleInputChange} />
          Salibandy
        </label>
        <label>
          <input
            name="multisportGroups"
            type="checkbox"
            checked={props.multisportGroups}
            onChange={props.handleInputChange} />
          Monilajiryhmät
        </label>
        <label>
          <input
            name="football"
            type="checkbox"
            checked={props.football}
            onChange={props.handleInputChange} />
          Jalkapallo
        </label>
        <label>
          <input
            name="runningCourses"
            type="checkbox"
            checked={props.runningCourses}
            onChange={props.handleInputChange} />
          Juoksukurssit
        </label>
      </div>
    </div>
  );
}