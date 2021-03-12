import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { StylesProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    margin: "0px",
    '& .MuiInputBase-root': {
      color: '#414f57',
      backgroundColor: "rgb(144, 163, 173, 0.5)",
      borderRadius: "5px 5px 0 0",
      padding: "0px",
      paddingTop: "5px",
      width: "100%",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1rem",
    },
    '& .Mui-disabled': {
        backgroundColor: "transparent",
        borderRadius: 0,
    },
    '& .MuiInput-underline:after': {
      border: "none",
    },
    '& .MuiInput-underline:before': {
      border: "none",
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: "none",
    },

    '& .MuiSelect-root': {
        padding: "5px",
        borderBottom: "1px solid #414f57",
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Genres(props) {
  const classes = useStyles();
  const [gender, setGender] = React.useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
    props.setGender("gender", event.target.value);
  };

  return (
    <StylesProvider injectFirst>
      <FormControl className={classes.formControl} disabled={props.disabled}>
        <Select
          value={gender}
          onChange={handleChange}
          id="gender"
          displayEmpty
          defaultValue={props.value}
          className={classes.select}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
     </StylesProvider>   
  );
}