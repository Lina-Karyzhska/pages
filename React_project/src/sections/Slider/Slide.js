import React, { Component } from 'react';

class Slide extends Component {
    constructor(props){
      super(props);
    }

    render() {
        const {Title, Plot, Genre, Actors, Poster, Ratings} = this.props.info;
        return (
            <div className="slider__item">
                <div className="slider__item_mask"></div>
                <div className="slider__item_description">
                    <h2 className="slider__title">
                        {Title}
                    </h2>
                    <p>
                        {Plot}
                    </p>
                    <h3 className="slider__subtitle">Genres</h3>
                    <p>{Genre}</p>
                    <h3 className="slider__subtitle">Cast</h3>
                    <p>{Actors}</p>
                    <div className="rating__wrapper">
                        <svg className="rating" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 30 30">
                            <image id="tomatometer-fresh.149b5e8adc3" width="30px" height="30px" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAC1UlEQVRIicWXT0gUURzHPzObIy5saoWUptYqYcUULEUlJtGfS3oLq0MQneoSWxRBl25BBUHbyS7dMggpiiSKyEMWQTCiC6ZUKv7NRTTX9amz/+LZrG3+aV1z1+9hYOa9mc/7Pb7vzfcpJJJHzwQuAZtxey8m7L9ELQV8DbgNBIGtuL39ePQS4CSwHmjE7W1IBdgGvAKOAbeAr0AtkGH1mAJO4fa++H+wR98EXAAqgWygD6gCJoEsQLV6RoA9uL3NyUAXBnt0CagD1i7hfRNosQY3BnwHPgL1uL2DSwd7dDl9N62qNgIHgIJkq7H8IH1xA7c3mhj8ZwDVgDTVwSRgZnEg1FHdOzFd4ZtyCJsSOTw42VwgQlc0Q/z4N9ij68B94FD84w3T4W/DmbbimKEUEG9eD4w0FNoH1ShquW8q5+iAcNpD0YUK8QEnNEM0LQz26Nu1SLTOVBUJt8UANV2B9odNPlf+6S2d/gzVKZ+X+oOtbc96diUxG9KUVZohGueBTZc9D/hsqkpRpyNjNKgSLPUH87LCUYKqguOMczyi4MgMR4danvdmOseDOUmApUaB3ZoheuXNmriGB0CRFolSNmbmxr/RUGjv3uY3R473Ca63jurZZiRj3mcTK9da/1WzFZsu+xHg7TI+thxVaoZ4H9sILqcJKnVeXhTTZZeLf3jOtKdSfmCdrHh/GqFYO6IuwWVphMZUolpuS7fy1VWASikSHFgF8JAEd60CuEOCP6QZKrdOr2r9sj6lEVyvGSIcM1dtmqAyFNwjLjs9siJMqlWrGaJtFqwZIgScsxJjqvTFSjXEVyzhMimetZLjSqvfCgKBeWAL/gSoASZWENwKlGuG+GvZztu5NEM8ncnK/+/0MHAX2KcZomdu46InCdNll22y+qvA3iSA0iePgTuaIdoX65T4CPN7EDsBGXkrgB0zBzjQrOafQDdgAO+Al5ohZLhfXMAv5izh16rtLgsAAAAASUVORK5CYII="/>
                        </svg>

                        {Ratings}
                    </div>
                </div>
                
                <img src={Poster} alt="poster"/>
            </div>
        )
    }
}

export default Slide;