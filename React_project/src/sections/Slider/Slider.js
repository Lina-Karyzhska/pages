import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import React, { Component } from 'react';
import Slider from 'react-slick';
import Slide from './Slide';

class AppSlider extends Component {
    constructor(props){
      super(props);

      this.state = {
        slides: [],
      }

      this.getTopFilms = this.getTopFilms.bind(this);
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    getTopFilms() {
        fetch("./data.json",
          {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
        .then(res => res.json())
        .then(res => {
          let length = res.length;
          let films = [];

          for (let i = 0; i < 3; i++) {
            let index = this.getRandomInt(length);
            films.push(res[index]);
          }

          this.setState({
            slides: films,
          });
        })
    }

    getSlides = () => {
      let slides = [];
      for (let slide of this.state.slides) {
        slides.push(<Slide key={slide.id} info={slide}/>)
      }

      return slides;
    }

    componentDidMount() {
      this.getTopFilms();
    }

    render() {
      const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: false,
      };

      return ( 
        <div className="section__slider">
          <div className="slider__mask"></div>
          
          <section className="slider">
            <div className="slider__wrapper">
              <Slider {...settings}>
                {this.getSlides()}
              </Slider>
            </div>
          </section>
        </div>
      )
    }
}

export default AppSlider;