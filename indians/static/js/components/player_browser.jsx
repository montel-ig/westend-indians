const PlayerBrowser = () => {
  return (
    <div className="player-browser-root">
      {[...Array(15)].map((_, i) => <Player number={i+1} key = {i}/>)}
    </div>
  )
};

ReactDOM.render(
  <PlayerBrowser />,
  document.getElementById('players')
);