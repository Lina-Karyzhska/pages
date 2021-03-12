import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { StylesProvider } from '@material-ui/core/styles';
import '../../../styles/dist/DropdownGenres.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0 8px",
    '& .MuiInputBase-root': {
      color: '#d9d9d9',
      paddingRight: "5px",
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

export default function Sort(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
    props.setFilter("sort", event.target.value);
  };

  return (
    <StylesProvider injectFirst>
      <FormControl className={classes.formControl}>
        <Select
          value={sort}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            None
          </MenuItem>
          <MenuItem value={"Critic's Score"}>Critic's Score</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
        </Select>
      </FormControl>
     </StylesProvider>   
  );
}