import React, { Component } from 'react';
import FilmCard from './FilmCard';
import Filter from './Filter/Filter';
import Button from '../Button';

class FilmList extends Component {
    constructor(props){
      super(props);
      this.isFetched = false;
      this.filmList = [];
      this.size = window.innerWidth > 1024 ? 10 : (window.innerWidth > 768 || window.innerWidth < 500) ? 8 : 9;
      
      this.state = {
        filmList: [],
        counter: this.size,
      }

      this.getYear = this.getYear.bind(this);
    }

    getSkeletons() {
      let skeletons = [];
      for (let i = 0; i < this.size; i++) {
        skeletons.push(<FilmCard key={i} />)
      }
      return skeletons;
    }

    getFilms = () => {
      fetch("data.json",
        {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          this.filmList = [...res];
          this.setState({filmList: [...res]});
        })
        this.isFetched = true;
    }

    updateSize = () => {
      this.size = window.innerWidth > 1024 ? 10 : (window.innerWidth > 768 || window.innerWidth < 500) ? 8 : 9;
      this.setState({
        counter: this.size
      });
    }

    componentDidMount() {
      this.getFilms();
      window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
    }

    getCards = () => {
      let cards = [];
      for (let i = 0; i < this.state.counter; i++) {
        if (!this.state.filmList[i]) break;
        const {id, Title, Year, Type, Ratings, Poster} = this.state.filmList[i];
        cards.push(<FilmCard key={id} info={{Title, Year, Type, Ratings, Poster, id}} isFetched />)
      }
      return cards.length ? cards : <div className="filmlist__notFound">Not found</div>
    }

    getFilteredFilms = (filters) => {
      let films;
      const obj = {
        movie: filters.isMovie && !filters.isTV,
        series: !filters.isMovie && filters.isTV
      }

      for (let [key, value] of Object.entries(obj)) {
       if (value) films = [...this.filmList.filter(el => el.Type == key)];
      }

      if (!films) {
        films = [...this.filmList];
      }

      films = [...films.filter(el => el.Genre.includes(filters.genre))];

      films = [...films.filter(el => this.getYear(el, filters))];

      films = [...films.filter(el => el.Title.includes(this.props.title) || el.Title.toLowerCase().includes(this.props.title))];

      if (filters.sort) this.sort(films, filters.sort);

      this.isFetched = true;
      this.setState({
        filmList: [...films],
        counter: this.size,
      })
    }

    getYear(el, filters) {
      let years = `${el.Year}`.split("–");
      return ((+years[1] == "") || !years[1]) ? (years[0] >= filters.years[0] && +years[0] <= filters.years[1]) : (years[0] >= filters.years[0] && years[1] <= filters.years[1])
    }

    compareByScore(a, b) {
      return b.Ratings.split("%")[0] - a.Ratings.split("%")[0];
    }

    compareByYear(a, b) {
      return `${b.Year}`.split("–")[0] - `${a.Year}`.split("–")[0];
    }

    sort = (arr, cond) => {
      if (cond == "Critic's Score") {
        arr.sort(this.compareByScore)
      } else {
        arr.sort(this.compareByYear)
      }
    }

    increaseCounter = () => {
      this.setState({counter: this.state.counter + this.size})
    }

    revertCounter = () => {
      this.setState({counter: this.size})
    }

    areAllFilmsShown = () => {
      if (this.state.filmList.length > this.size) return this.state.counter >= this.state.filmList.length;
    }

     render() {
        return (
            <div className="section__wrapper" >
              <div className="filmlist__control">
                <Filter title={this.props.title} getFilters={this.getFilteredFilms}/>
              </div>

              <div className="filmlist">
                {this.isFetched ? this.getCards() : this.getSkeletons()}
              </div>

              { this.areAllFilmsShown() ? <Button handleClick={this.revertCounter} inner='Hide'/> 
              : this.state.filmList.length > this.size && <Button handleClick={this.increaseCounter} inner='More'/> }
            </div>
        )
    }
}

export default FilmList;