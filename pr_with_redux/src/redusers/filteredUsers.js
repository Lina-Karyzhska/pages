const filteredUsers = (state = [], action) => {
    if (action.type === "GET_FILTERED_USERS") {
        return [...action.filteredUsers];
    }

    return state;
}

export default filteredUsers;