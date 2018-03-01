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
                checked={props.selectedProperties.selectedGender===null}
                onChange={props.handleChangedGender}
              />
              <span>Kaikki</span>
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={props.selectedProperties.selectedGender==="male"}
                onChange={props.handleChangedGender}
              />
              <span>Miehet</span>
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={props.selectedProperties.selectedGender==="female"}
                onChange={props.handleChangedGender}
              />
              <span>Naiset</span>
            </label>
            <label>
              <input
                type="radio"
                value="mixed"
                name="gender"
                checked={props.selectedProperties.selectedGender==="mixed"}
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
            value={props.selectedProperties.selectedAge}
            onChange={props.handleSelectChange}
            clearable={false}
            resetValue=""
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "selectedAge"},
              { value: 'adult', label: '+20-vuotiaat', property: "selectedAge"},
              { value: 'a', label: '17-20', property: "selectedAge"},
              { value: 'b', label: '15-17', property: "selectedAge"},
              { value: 'c', label: '13-15', property: "selectedAge"},
              { value: 'd', label: '11-13', property: "selectedAge"},
              { value: 'e', label: '9-11', property: "selectedAge"},
              { value: 'f', label: '7-9', property: "selectedAge"},
              { value: 'g', label: '5-7', property: "selectedAge"},
              { value: 'h', label: '3-5', property: "selectedAge"},
              { value: 'i', label: '1-3', property: "selectedAge"}
            ]}
          />
        </div>
        <div className='select-path'>
          <p>Polku <span className="events">(Tapahtumakerrat viikossa)</span></p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.selectedPath}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "selectedPath"},
              { value: 'urheilijan', label: 'Urheilijan polku (3+)', property: "selectedPath" },
              { value: 'kilpailijan', label: 'Kilpailijan polku (3-2)', property: "selectedPath" },
              { value: 'harrastajan', label: 'Harrastajan polku (1)', property: "selectedPath" },
              { value: 'salibandy_koulut', label: 'Salibandy koulut (1, 2 tai 3)', property: "selectedPath" },
              { value: 'koulujen_iltapaivatoiminta', label: 'Koulujen iltapäivätoiminta (1 tai 2)', property: "selectedPath" },
              { value: 'erityisryhmat', label: 'Erityisryhmät', property: "selectedPath" }
            ]}
          />
        </div>
        <div className='select-area'>
          <p>Alueet</p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.selectedArea}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "selectedArea"},
              { value: 'tapiola', label: 'Tapiola', property: "selectedArea" },
              { value: 'leppavaara', label: 'Leppävaara', property: "selectedArea" },
              { value: 'matinkylaolari', label: 'Matinkylä-Olari', property: "selectedArea" },
              { value: 'espoonkeskus', label: 'Espoon keskus', property: "selectedArea" },
              { value: 'espoonlahti', label: 'Espoonlahti', property: "selectedArea" },
              { value: 'kauklahti', label: 'Kauklahti', property: "selectedArea" },
              { value: 'pohjoisespoo', label: 'Pohjois-Espoo', property: "selectedArea" }
            ]}
          />
        </div>
        <div className='select-sport'>
          <p>Laji</p>
          <Select
            name="form-field-name"
            placeholder="Kaikki"
            value={props.selectedProperties.selectedSport}
            onChange={props.handleSelectChange}
            clearable={false}
            noResultsText="Ei tuloksia"
            options={[
              { value: 'all', label: 'Kaikki', property: "selectedSport"},
              { value: 'floorball', label: 'Salibandy', property: "selectedSport" },
              { value: 'multiple', label: 'Monilajiryhmät', property: "selectedSport" },
              { value: 'football', label: 'Jalkapallo', property: "selectedSport" },
              { value: 'running', label: 'Juoksukurssit', property: "selectedSport" }
            ]}
          />
        </div>
      </div>
    </div>
  );
};