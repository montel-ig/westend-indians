const HEADINGS = [
  {name: '', accessor: null},
  {name: 'joukkue', accessor: 'name'},
  {name: 'o', accessor: 'matches'},
  {name: 'v', accessor: 'wins'},
  {name: 'h', accessor: 'losses'},
  {name: 'h1', accessor: 'losses_contd_period'},
  {name: 'tm', accessor: 'goals_scored'},
  {name: 'pm', accessor: 'goals_suffered'},
  {name: 'me', accessor: 'goal_difference'},
  {name: 'p', accessor: 'points'}
]

class Stats extends React.Component {
  constructor(props) {
    super()
    this.state = {
      selectedColumn: null
    }
  }

  componentDidMount() {
    this.selectColumn('points')
  }

  renderHeadings() {
    return HEADINGS.map((h, i) => (
      <th className={this.isSelected(h.accessor)} key={i} onClick={() => this.selectColumn(h.accessor)}>{h.name}</th>
    ))
  }

  renderRows() {
    return stats.map((r,i) => (
      <tr key={i}>
        <td>{i+1}</td>
        <td className={this.isSelected('name')}>{r.name}</td>
        <td className={this.isSelected('matches')}>{r.matches}</td>
        <td className={this.isSelected('wins')}>{r.wins}</td>
        <td className={this.isSelected('losses')}>{r.losses}</td>
        <td className={this.isSelected('losses_contd_period')}>{r.losses_contd_period}</td>
        <td className={this.isSelected('goals_scored')}>{r.goals_scored}</td>
        <td className={this.isSelected('goals_suffered')}>{r.goals_suffered}</td>
        <td className={this.isSelected('goal_difference')}>{r.goal_difference}</td>
        <td className={this.isSelected('points')}>{r.points}</td>
      </tr>
    ))
  }

  selectColumn(col) {
    if (col) {
      this.sortBy(col)
      this.setState({
        selectedColumn: col
      })
    }
  }

  isSelected(col) {
    if (!col) {
      return ''
    }
    return this.state.selectedColumn === col ? 'selected' : ''
  }

  sortBy(stat) {
    stats = stats.sort((a,b) => b[stat] - a[stat])
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.renderHeadings()}
          </tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    )
  }
}

function createStats(id) {
  ReactDOM.render(
    <Stats />,
    document.getElementById(id)
  );
}