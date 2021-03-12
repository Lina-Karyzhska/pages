import React, { Component } from 'react';
import FilmCard from './FilmCard';
import Button from '../Button';

class FavFilms extends Component {
    constructor(props){
      super(props);
      this.isFetched = false;
      this.favFilms = [];
      this.title = "";
      this.size = window.innerWidth > 1024 ? 10 : (window.innerWidth > 768 || window.innerWidth < 500) ? 8 : 9;
   
      this.state = {
        favFilms: [],
        counter: this.size,
        isShown: this.props.favFilmsShown,
      }
    }

    getSkeletons() {
      let skeletons = [];
      for (let i = 0; i < this.state.counter; i++) {
        skeletons.push(<FilmCard key={i} />)
      }
      return skeletons;
    }

    getFavFilms = () => {
        let films = [];

        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key) || isNaN(key)) {
                continue;
            }

            films.push(JSON.parse(localStorage[key]));
        }

        this.isFetched = true;
        this.favFilms = [...films];

        this.setState({
            favFilms: [...films]
        })
    }

    updateSize = () => {
      this.size = window.innerWidth > 1024 ? 10 : (window.innerWidth > 768 || window.innerWidth < 500) ? 8 : 9;
      this.setState({
        counter: this.size
      });
    }

    componentDidMount() {
      this.getFavFilms();
      if (this.title != this.props.title) this.getFilteredFilms();
      window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
    }

    getCards = () => {
      let cards = [];
      for (let i = 0; i < this.state.counter; i++) {
        if (!this.state.favFilms[i]) break;
        const {id, Title, Year, Type, Ratings, Poster} = this.state.favFilms[i];
        cards.push(<FilmCard key={id} info={{Title, Year, Type, Ratings, Poster, id}} isFetched />)
      }
      return cards.length ? cards : <div className="filmlist__notFound">Not found</div>
    }

    getFilteredFilms = () => {
      let films = [];

      films = [...this.favFilms.filter(el => el.Title.includes(this.props.title) || el.Title.toLowerCase().includes(this.props.title))];

      this.isFetched = true;
      this.title = this.props.title;
      this.setState({
        favFilms: [...films],
        counter: this.size,
      })
    }

    componentDidUpdate() {
      if (this.title != this.props.title) this.getFilteredFilms();
    }

    increaseCounter = () => {
      this.setState({counter: this.state.counter + this.size})
    }

    revertCounter = () => {
      this.setState({counter: this.size})
    }

    areAllFilmsShown = () => {
      if (this.state.favFilms.length > this.size) return this.state.counter >= this.state.favFilms.length;
    }

    toggleFavList = () => {
      this.setState({isShown: !this.state.isShown})
      setTimeout(() => document.querySelector(".section_second").scrollIntoView({behavior: "smooth"}), 0);
    }

     render() {
        return (
            <div className="section__wrapper">
              <div className="fav__btn">
                <Button handleClick={this.toggleFavList} inner={this.state.isShown ? 'Hide' : 'Show Favorite Films'}/>
              </div>

              { this.state.isShown ? 
                  <div className="filmlist">
                    {this.isFetched ? this.getCards() : this.getSkeletons()}
                  </div>
              : null }

              { this.areAllFilmsShown() ? <Button handleClick={this.revertCounter} inner='Hide'/> 
              : this.state.isShown && this.state.favFilms.length > this.size && <Button handleClick={this.increaseCounter} inner='More'/> }
            </div>
        )
    }
}

export default FavFilms;
