import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    transition: '700ms',
    '&:hover': {
      backgroundColor: 'rgba(217, 217, 217, 0.06)',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: '#566269',
  },
  checkedIcon: {
    backgroundColor: '#d9d9d9',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='black'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});

function StyledCheckbox(props) {
  const classes = useStyles();
  let filter = props.name == "Movie" ? "isMovie" : "isTV";
  return (
      <FormControlLabel
        value="end"
        control={<Checkbox
            className={classes.root}
            onChange={(event) => props.setFilter(filter, event.target.checked)}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            inputProps={{ 'aria-label': 'decorative checkbox' }}
            {...props}
        />}
          label={props.name}
          labelPlacement="end"
        />
    
  );
}

class CustomizedCheckbox extends React.Component {
    constructor(props) {
        super(props)
    }
    
     render() {
        return(
           <StyledCheckbox setFilter={this.props.setFilter} name={this.props.name}/>
        )
    }
}

export default CustomizedCheckbox;