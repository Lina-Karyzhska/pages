import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';

function List({users}) {
    const renderList = () => {
        let items = users.map(el => <Item key={users.indexOf(el)} user={el}/>);

        return items;
    }

    return (
        <ul className="list">
            { users.length ? renderList() : "Not found" }
        </ul>
    )
}

export default connect(
  state => ({
    users: state.filteredUsers
  })
)(List);