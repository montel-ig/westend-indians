const PathInfo = (props) => (
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
);

const Gender = (props) => (
  <div className="team-gender">
    <label>
      <input
        type="radio"
        value="all"
        name="gender"
        checked={props.gender===null}
        onChange={props.handleChangedGender}
      />
      <span>Kaikki</span>
    </label>
    <label>
      <input
        type="radio"
        value="male"
        name="gender"
        checked={props.gender==="male"}
        onChange={props.handleChangedGender}
      />
      <span>Miehet ja pojat</span>
    </label>
    <label>
      <input
        type="radio"
        value="female"
        name="gender"
        checked={props.gender==="female"}
        onChange={props.handleChangedGender}
      />
      <span>Naiset ja tytöt</span>
    </label>
  </div>
);

const Age = (props) => (
  <div className='select-age'>
    <p>Syntymävuosi</p>
    <Select
      name="form-field-name"
      placeholder="Kaikki"
      value={props.age}
      onChange={props.handleSelectChange}
      clearable={false}
      resetValue=""
      noResultsText="Ei tuloksia"
      options={props.types
        .map(t => ({value: encodeURIComponent(t.name), label: t.name, property: 'age_level'}))
        .concat([{value: 'all', label: 'Kaikki', property: "age_level"}])
        .sort((a, b) => b - a)
      }
    />
  </div>
);

const Path = (props) => (
  <div className='select-path'>
    <p>Tapahtumat / viikko (Polku)</p>
    <Select
      name="form-field-name"
      placeholder="Kaikki"
      value={props.path}
      onChange={props.handleSelectChange}
      clearable={false}
      noResultsText="Ei tuloksia"
      options={[
        { value: 'all', label: 'Kaikki', property: "path"},
        { value: 'urheilijan', label: '3+ (Urheilijan polku)', property: "path" },
        { value: 'kilpailijan', label: '3-2 (Kilpailijan polku)', property: "path" },
        { value: 'harrastajan', label: '2-1 (Harrastajan polku)', property: "path" },
        { value: 'kaupunginosajoukkueet', label: 'Kaupunginosajoukkueet (F-G-juniorit)', property: "path" },
        { value: 'salibandy_koulut', label: 'Salibandykoulut (H-juniorit)', property: "path" },
        { value: 'koulujen_iltapaivatoiminta', label: 'Koulujen iltapäivätoiminta (6lk-Esikoulu)', property: "path" },
        { value: 'erityisryhmat', label: 'Erityisryhmät', property: "path" }
      ]}
    />
  </div>
);

const Area = (props) => (
  <div className='select-area'>
    <p>Alue</p>
    <Select
      name="form-field-name"
      placeholder="Kaikki"
      value={props.area}
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
);

const Sport = (props) => (
  <div className='select-sport'>
    <p>Laji</p>
    <Select
      name="form-field-name"
      placeholder="Kaikki"
      value={props.sport}
      onChange={props.handleSelectChange}
      clearable={false}
      noResultsText="Ei tuloksia"
      options={[
        { value: 'all', label: 'Kaikki', property: "sport"},
        { value: 'floorball', label: 'Salibandy', property: "sport" },
        { value: 'multiple', label: 'Monilajiryhmät', property: "sport" },
        { value: 'soccer', label: 'Jalkapallo', property: "sport" },
        { value: 'running', label: 'Juoksukurssit', property: "sport" }
      ]}
    />
  </div>
);

const TeamFilter = (props) => {
  return (
    <div className="filter-container">
      <h2>Löydä joukkueesi tai harrasteryhmäsi</h2>
      <div>
        <div className="column">
          <Gender
            gender={props.selectedProperties.gender}
            handleChangedGender={props.handleChangedGender}
          />
        </div>
        <div className="column">
          <Age
            age={props.selectedProperties.age_level}
            types={props.types}
            handleSelectChange={props.handleSelectChange}
          />
          <Path
            path={props.selectedProperties.path}
            handleSelectChange={props.handleSelectChange}
          />
        </div>
        <div className="column">
          <Sport
            sport={props.selectedProperties.sport}
            handleSelectChange={props.handleSelectChange}
        />
          <Area
            area={props.selectedProperties.area_name}
            handleSelectChange={props.handleSelectChange}
          />
        </div>
      </div>
    </div>
  );
};