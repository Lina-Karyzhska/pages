const allUsers = (state = [], action) => {
    if (action.type === "GET_All_USERS") {
        return [...action.allUsers];
    }

    return state;
}

export default allUsers;