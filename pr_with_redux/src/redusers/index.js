import { combineReducers } from 'redux';
import allUsers from './allUsers';
import filteredUsers from './filteredUsers'

export default combineReducers({
    allUsers,
    filteredUsers
})

