const TeamFilter = (props) => {
  return (
    <div className="team-filter">
      <div className='select-age'>
        <p>Ikä</p>
        <label>
          <input
            name="i"
            type="checkbox"
            checked={props.i}
            onChange={props.handleInputChange} />
          1-3
        </label>
        <label>
          <input
            name="h"
            type="checkbox"
            checked={props.h}
            onChange={props.handleInputChange} />
          3-5
        </label>
        <label>
          <input
            name="g"
            type="checkbox"
            checked={props.g}
            onChange={props.handleInputChange} />
          5-7
        </label>
        <label>
          <input
            name="f"
            type="checkbox"
            checked={props.f}
            onChange={props.handleInputChange} />
          7-9
        </label>
        <label>
          <input
            name="e"
            type="checkbox"
            checked={props.e}
            onChange={props.handleInputChange} />
          9-11
        </label>
        <label>
          <input
            name="d"
            type="checkbox"
            checked={props.d}
            onChange={props.handleInputChange} />
          11-13
        </label>
        <label>
          <input
            name="c"
            type="checkbox"
            checked={props.c}
            onChange={props.handleInputChange} />
          13-15
        </label>
        <label>
        <input
          name="b"
          type="checkbox"
          checked={props.b}
          onChange={props.handleInputChange} />
        15-17
      </label>
      <label>
        <input
          name="a"
          type="checkbox"
          checked={props.a}
          onChange={props.handleInputChange} />
        17-20
      </label>
      <label>
        <input
          name="adult"
          type="checkbox"
          checked={props.adult}
          onChange={props.handleInputChange} />
        +20-vuotiaat
      </label>
      </div>
      {/*
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
      */
      }
      <div className='select-path'>
        <p>Polku</p>
        <label>
          <input
            name="urheilijan"
            type="checkbox"
            checked={props.urheilijan}
            onChange={props.handleInputChange} />
          Urheilijan polku (+3 tapahtumaa)
        </label>
        <label>
          <input
            name="kilpailijan"
            type="checkbox"
            checked={props.kilpailijan}
            onChange={props.handleInputChange} />
          Kilpailijan polku (3-2 tapahtumaa)
        </label>
        <label>
          <input
            name="harrastajan"
            type="checkbox"
            checked={props.harrastajan}
            onChange={props.handleInputChange} />
          Harrastajan polku (1 tapahtuma)
        </label>
        <label>
          <input
            name="salibandy_koulut"
            type="checkbox"
            checked={props.salibandy_koulut}
            onChange={props.handleInputChange} />
          Salibandykoulut (1, 2 tai 3 tapahtumaa)
        </label>
        <label>
          <input
            name="koulujen_iltapaivatoiminta"
            type="checkbox"
            checked={props.koulujen_iltapaivatoiminta}
            onChange={props.handleInputChange} />
          Koulujen iltapäivätoiminta (1 tai 2 tapahtumaa)
        </label>
        <label>
          <input
            name="erityisryhmat"
            type="checkbox"
            checked={props.erityisryhmat}
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
            checked={props.matinkylaolari}
            onChange={props.handleInputChange} />
          Matinkylä-Olari
        </label>
        <label>
          <input
            name="espoonKeskus"
            type="checkbox"
            checked={props.espoonkeskus}
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
            checked={props.pohjoisespoo}
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
            name="multiple"
            type="checkbox"
            checked={props.multiple}
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
            name="running"
            type="checkbox"
            checked={props.running}
            onChange={props.handleInputChange} />
          Juoksukurssit
        </label>
      </div>
    </div>
  );
};