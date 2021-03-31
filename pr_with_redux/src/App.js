import { useEffect } from 'react';
import Filter from './components/Filter';
import List from './components/List';
import { connect } from 'react-redux';
import './styles/dist/App.css';

function App({onFilterUsers, onGetAllUsers, allUsers}) {

  const getList = (filters) => {
    fetch('https://venbest-test.herokuapp.com/')
      .then(res => res.json())
      .then(res => {
        onGetAllUsers(res)
        filterList(filters, res)
      })
  }

  useEffect(() => getList({
            firstname: "",
            lastname: "",
            age: "",
            male: true,
            female: false,
        }), [])

  const filterList = (filters, list = allUsers) => {
    let newList = [...list];

    newList = [...newList.filter(el => el.name.includes(filters.firstname))];
    newList = [...newList.filter(el => el.lastname.includes(filters.lastname))];
    if (filters.age !== "") newList = [...newList.filter(el => el.age === +filters.age)];

    const sex = {
      m: filters.male && !filters.female,
      f: !filters.male && filters.female,
      neither: !filters.male && !filters.female
    }

    for (let [key, value] of Object.entries(sex)) {
      if (value) {
          newList = key === "neither" ? [] : [...newList.filter(el => el.sex === key)];
      }
    }

    onFilterUsers(newList);
  }

  return (
    <div className="app">
      <Filter getList={filterList} />
      <List/>
    </div>
  );
}

export default connect(
  state => ({
    allUsers: state.allUsers
  }),
  dispatch => ({
    onFilterUsers: (list) => {
      dispatch({ type: "GET_FILTERED_USERS", filteredUsers: list })
    },
    onGetAllUsers: (list) => {
      dispatch({ type: "GET_All_USERS", allUsers: list})
    }
  })
)(App);
