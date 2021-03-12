import React, { Component } from 'react';
import Avatar from './Avatar';
import Information from './Information';

class Profile extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
          <div className="section__wrapper profile">
            <h2 className="profile__title">Profile</h2>
            <div className="profile__wrapper">
              <Avatar />
              <Information />
            </div>
          </div>
        )
    }
}

export default Profile;