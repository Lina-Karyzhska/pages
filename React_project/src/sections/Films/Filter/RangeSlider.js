import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useTooltipStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  tooltipPlacementTop: {
    margin: '0px',
    position: 'relative',
    top: '2px',
    color: '#d9d9d9'
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const classes = useTooltipStyles();

  return (
    <Tooltip classes={classes} open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const AirbnbSlider = withStyles({
  root: {
    color: '#d9d9d9',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 10,
    width: 10,
    border: '1px solid currentColor',
    marginTop: -4,
    marginLeft: -4,
  },
  track: {
    height: 3,
    top: "12.5px",
  },
  rail: {
    color: '#666',
    opacity: 1,
    height: 2,
  },
})(Slider);

class CustomizedSlider extends React.Component {
  render() {
      return (
        <div>
          <AirbnbSlider
            onChangeCommitted={(event, value) => this.props.setFilter("years", value)}
            ValueLabelComponent={ValueLabelComponent}      
            valueLabelDisplay="on"
            defaultValue={[1940, 2021]}
            min={1940}
            max={2021}
          />
        </div>
    );
  } 
}

export default CustomizedSlider;