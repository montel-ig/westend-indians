const TeamFilter = (props) => {
  return (
    <div className="filter-container">
      <div className="filter-upper">
        <div className="filter-title">
          <h2>Löydä joukkueesi<hr /></h2>
          <div className="team-gender">
            <label>
              <input
                type="radio"
                value="all"
                name="gender"
                checked={props.selectedProperties.gender===null}
                onChange={props.handleChangedGender}
              />
              <span>Kaikki</span>
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={props.selectedProperties.gender==="male"}
                onChange={props.handleChangedGender}
              />
              <span>Miehet ja pojat</span>
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={props.selectedProperties.gender==="female"}
                onChange={props.handleChangedGender}
              />
              <span>Naiset ja tytöt</span>
            </label>
            <label>
              <input
                type="radio"
                value="mixed"
                name="gender"
                checked={props.selectedProperties.gender==="mixed"}
                onChange={props.handleChangedGender}
              />
              <span>Seka</span>
            </label>
          </div>
        </div>
        <div className="path-info">
          <p>
            <span>
              <svg id="harrastajan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
            </span>Harrastajan polku
          </p>
          <p>
            <span>
              <svg id="kilpailijan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
            </span>Kilpailijan polku
          </p>
          <p>
            <span>
              <svg id="urheilijan" width="55" height="55" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
            </span>Urheilijan polku
          </p>
        </div>
      </div>
      <div className="team-filter">
        <div className='select-age'>
          <p>Ikä</p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.age_level}
            onChange={props.handleSelectChange}
            clearable={false}
            resetValue=""
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "age_level"},
              { value: 'adult', label: '+20-vuotiaat', property: "age_level"},
              { value: 'a', label: '17-20', property: "age_level"},
              { value: 'b', label: '15-17', property: "age_level"},
              { value: 'c', label: '13-15', property: "age_level"},
              { value: 'd', label: '11-13', property: "age_level"},
              { value: 'e', label: '9-11', property: "age_level"},
              { value: 'f', label: '7-9', property: "age_level"},
              { value: 'g', label: '5-7', property: "age_level"},
              { value: 'h', label: '3-5', property: "age_level"},
              { value: 'i', label: '1-3', property: "age_level"}
            ]}
          />
        </div>
        <div className='select-path'>
          <p>Polku <span className="events">(Tapahtumakerrat viikossa)</span></p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.path}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "path"},
              { value: 'urheilijan', label: 'Urheilijan polku (3+)', property: "path" },
              { value: 'kilpailijan', label: 'Kilpailijan polku (3-2)', property: "path" },
              { value: 'harrastajan', label: 'Harrastajan polku (1)', property: "path" },
              { value: 'salibandy_koulut', label: 'Salibandy koulut (1, 2 tai 3)', property: "path" },
              { value: 'koulujen_iltapaivatoiminta', label: 'Koulujen iltapäivätoiminta (1 tai 2)', property: "path" },
              { value: 'erityisryhmat', label: 'Erityisryhmät', property: "path" }
            ]}
          />
        </div>
        <div className='select-area'>
          <p>Alueet</p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.area_name}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "area_name"},
              { value: 'tapiola', label: 'Tapiola', property: "area_name" },
              { value: 'leppavaara', label: 'Leppävaara', property: "area_name" },
              { value: 'matinkylaolari', label: 'Matinkylä-Olari', property: "area_name" },
              { value: 'espoonkeskus', label: 'Espoon keskus', property: "area_name" },
              { value: 'espoonlahti', label: 'Espoonlahti', property: "area_name" },
              { value: 'kauklahti', label: 'Kauklahti', property: "area_name" },
              { value: 'pohjoisespoo', label: 'Pohjois-Espoo', property: "area_name" }
            ]}
          />
        </div>
        <div className='select-sport'>
          <p>Laji</p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.sport}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "sport"},
              { value: 'floorball', label: 'Salibandy', property: "sport" },
              { value: 'multiple', label: 'Monilajiryhmät', property: "sport" },
              { value: 'football', label: 'Jalkapallo', property: "sport" },
              { value: 'running', label: 'Juoksukurssit', property: "sport" }
            ]}
          />
        </div>
      </div>
    </div>
  );
};