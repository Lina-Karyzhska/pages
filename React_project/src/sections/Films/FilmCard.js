import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Star from './Star';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: "#414f57",
    color: "#fff",

    "& .MuiPaper-root": {
      margin: 0,
      marginLeft: 0,
    }
  },
  media: {
    height: 300,
  },
}));

function Film(props) {
  const loading = props.isFetched;
  let favBtnClass = "card__favbtn card__desc";

  if (props.isFav) {
    favBtnClass += " card__favbtn_isFav";
  }

  let info;
  if (props.info) {
    info = props.info;
  }

  const classes = useStyles();

  const toggleFav = (event) => {
    if (event.currentTarget.disabled) return
    props.setFav(event)
  }

  return (
    <Card className={classes.card}>
      {loading ? (
        <div className="card__img_wrapper">
          <img src={info.Poster} alt="poster" className="card__img"/>
        </div>
      ) : (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <h4>{info.Title}</h4>
            <p>
              <span className="card__desc">{info.Year}</span>
              <span className="card__desc">{info.Type}</span>
            </p>
            <div>
              <svg className="rating" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 30 30">
                <image id="tomatometer-fresh.149b5e8adc3" width="30px" height="30px" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAC1UlEQVRIicWXT0gUURzHPzObIy5saoWUptYqYcUULEUlJtGfS3oLq0MQneoSWxRBl25BBUHbyS7dMggpiiSKyEMWQTCiC6ZUKv7NRTTX9amz/+LZrG3+aV1z1+9hYOa9mc/7Pb7vzfcpJJJHzwQuAZtxey8m7L9ELQV8DbgNBIGtuL39ePQS4CSwHmjE7W1IBdgGvAKOAbeAr0AtkGH1mAJO4fa++H+wR98EXAAqgWygD6gCJoEsQLV6RoA9uL3NyUAXBnt0CagD1i7hfRNosQY3BnwHPgL1uL2DSwd7dDl9N62qNgIHgIJkq7H8IH1xA7c3mhj8ZwDVgDTVwSRgZnEg1FHdOzFd4ZtyCJsSOTw42VwgQlc0Q/z4N9ij68B94FD84w3T4W/DmbbimKEUEG9eD4w0FNoH1ShquW8q5+iAcNpD0YUK8QEnNEM0LQz26Nu1SLTOVBUJt8UANV2B9odNPlf+6S2d/gzVKZ+X+oOtbc96diUxG9KUVZohGueBTZc9D/hsqkpRpyNjNKgSLPUH87LCUYKqguOMczyi4MgMR4danvdmOseDOUmApUaB3ZoheuXNmriGB0CRFolSNmbmxr/RUGjv3uY3R473Ca63jurZZiRj3mcTK9da/1WzFZsu+xHg7TI+thxVaoZ4H9sILqcJKnVeXhTTZZeLf3jOtKdSfmCdrHh/GqFYO6IuwWVphMZUolpuS7fy1VWASikSHFgF8JAEd60CuEOCP6QZKrdOr2r9sj6lEVyvGSIcM1dtmqAyFNwjLjs9siJMqlWrGaJtFqwZIgScsxJjqvTFSjXEVyzhMimetZLjSqvfCgKBeWAL/gSoASZWENwKlGuG+GvZztu5NEM8ncnK/+/0MHAX2KcZomdu46InCdNll22y+qvA3iSA0iePgTuaIdoX65T4CPN7EDsBGXkrgB0zBzjQrOafQDdgAO+Al5ohZLhfXMAv5izh16rtLgsAAAAASUVORK5CYII="/>
              </svg>
              
              <span  className="card__desc">{info.Ratings}</span>
              {localStorage.isAuthenticated == "true" ? 
                <Tooltip title="Add to favorite" placement="right" TransitionComponent={Zoom} enterDelay={500}><span>
                  <button data-isfav={props.isFav} onClick={(event) => toggleFav(event)} className={favBtnClass}>
                    <Star />
                  </button></span>
                </Tooltip>
              : null}
             
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Skeleton animation="wave" height={10} width="70%" style={{ margin: "auto", marginBottom: "5px" }} />
            <Skeleton animation="wave" height={10} width="50%" style={{ margin: "auto", marginBottom: "5px"}}/>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation="wave" height={10} width="15%" style={{margin: "0 5px"}}/>
            <Skeleton animation="wave" height={10} width="15%" style={{margin: "0 5px"}}/>
            </div>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}

Film.propTypes = {
  loading: PropTypes.bool,
};

class FilmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false,
    }
  }

  setFav = (event) => {
    if (event.currentTarget.dataset.isfav == "false") {
      let obj = {
        isFav: true,
      }

      localStorage[this.info.id] = JSON.stringify({...this.info, ...obj});
      event.currentTarget.dataset.isfav = "true";
    } else {
      localStorage.removeItem(this.info.id)
      event.currentTarget.dataset.isfav = "false"
    }

    this.setState({isFav: !this.state.isFav})
  }

  componentDidMount() {
    if (this.info && localStorage[this.info.id] && !this.state.isFav) {
      this.setState({
        isFav: true,
      })
    }
  }

  componentDidUpdate() {
    if (this.info && localStorage[this.info.id] && !this.state.isFav) {
      this.setState({
        isFav: true,
      })
    }
  }
  
  render() {
    this.info = this.props.info;

    return (
      <div className="card">
        <Film setFav={this.setFav} isFetched={this.props.isFetched} isFav={this.state.isFav} info={this.info} />
      </div>
    )
  }
}

export default FilmCard;
