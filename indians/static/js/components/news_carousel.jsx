class NewsCarousel extends React.Component {

  constructor(props) {
    super(props)
    const firstId = props.news.length > 0 ? props.news[0].id : null
    this.state = {
      currentHighlight: firstId,
      highlightOpacity: 0.0,
      animationStartedTime: new Date().getTime(),
      automaticSwitchIntervalId: null
    }
    this.showNews = this.showNews.bind(this)
  }

  showNews(id, cancelTimeout) {
    this.setState({currentHighlight: id, highlightOpacity: 0.0, animationStartedTime: new Date().getTime()})
    if(cancelTimeout) {
      clearInterval(this.state.automaticSwitchIntervalId)
    }
  }

  render() {

    const hilight = this.props.news.length > 0 ? this.props.news.find((n) => n.id === this.state.currentHighlight) : null

    const newsItems = this.props.news.map((n) =>
      <a className={`news-item ${hilight && n.id === hilight.id ? 'active' : ''}`}
         key={n.id} data-id={n.id}
         onClick={(e) => this.showNews(n.id, true)}>
        <h3><span className="arrow">»</span>{n.title}</h3>
      </a>
    )

    // custom cooked opacity animation
    if(this.state.animationStartedTime !== null) {
      const ct = new Date().getTime()
      const dt = ct - this.state.animationStartedTime
      const o = dt / 600.0;
      if(o > 1.0) {
        setTimeout(() => this.setState({animationStartedTime: null, highlightOpacity: 1.0}), 0)
      } else {
        setTimeout(() => this.setState({highlightOpacity: o}), 0)
      }
    }

    // automatic switching if more than one news item
    if(!this.state.automaticSwitchIntervalId && newsItems.length > 1) {
      this.state.automaticSwitchIntervalId = setInterval(() => {
        const highlightIndex = this.props.news.findIndex((d) => d.id === this.state.currentHighlight)
        let ni = highlightIndex + 1
        if(ni >= newsItems.length) {
          ni = 0
        }
        //console.log(ni, newsItems.length)
        this.showNews(this.props.news[ni].id)
      }, 4000)
    }

    return (
      <div className="news-carousel">
        {
          hilight ?
            <article className={`highlight`} style={{'opacity': this.state.highlightOpacity}}>
              <div className="image" style={{'backgroundImage': `url(${hilight.image})`}}>
              </div>
              <div className="description">
                <h1>{hilight.title}</h1>
                <p>{hilight.ingress}</p>
                <a href={`/uutiset/${hilight.slug}`} className="button">Lue koko juttu</a>
              </div>
            </article> : null
        }
        {
          newsItems.length > 0 ?
            newsItems :
            <span>{t('news_carousel', 'no news')}</span>
        }
      </div>
    )
  }
}

NewsCarousel.defaultProps = {
  news: []
}

function createNewsCarousel(id, news) {
  ReactDOM.render(
    <NewsCarousel news={news}/>,
    document.getElementById(id)
  )
}