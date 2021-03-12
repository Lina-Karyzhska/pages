import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { StylesProvider } from '@material-ui/core/styles';
import '../../../styles/dist/DropdownGenres.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100px",
    '& .MuiInputBase-root': {
      color: '#d9d9d9',
      backgroundColor: "#566269",
      padding: "0 10px",
      width: "100%",
      borderRadius: "5px"
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
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Genres(props) {
  const classes = useStyles();
  const [genre, setGenre] = React.useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
    props.setFilter("genre", event.target.value);
  };

  return (
    <StylesProvider injectFirst>
      <FormControl className={classes.formControl}>
        <Select
          value={genre}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Genre
          </MenuItem>
          <MenuItem value={"Drama"}>Drama</MenuItem>
          <MenuItem value={"Comedy"}>Comedy</MenuItem>
          <MenuItem value={"Adventure"}>Adventure</MenuItem>
          <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
          <MenuItem value={"Romance"}>Romance</MenuItem>
          <MenuItem value={"Crime"}>Crime</MenuItem>
        </Select>
      </FormControl>
     </StylesProvider>   
  );
}