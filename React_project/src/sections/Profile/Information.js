import React, { Component } from 'react';
import SelectGender from './SelectGender';

class Information extends Component {
    constructor(props){
      super(props);
      this.user = {
          nickname: localStorage.nickname || "",
          email: localStorage.email || "",
          gender: localStorage.gender || "",
          age: localStorage.age || "",
          city: localStorage.city || "",
          media: localStorage.media || "",
          about: localStorage.about || "",
          name: localStorage.name || "",
        }

      this.state = {
        changed: false,
        disabled: true,
      }
    }

    changeInfo = () => {
      [...document.querySelectorAll(".profile__information_input")].forEach(el => {
        el.toggleAttribute("disabled");
        el.classList.toggle("disabled")
      });

      document.querySelector(".profile__information_textarea").toggleAttribute("disabled");
      document.querySelector(".profile__information_textarea").classList.toggle("disabled");

      this.setState({
        
        disabled: !this.state.disabled
      })
    }

    componentDidMount() {
      this.setState({changed: false})
    }

    setUserInfo = (key, value) => {
      this.user[key] = value;
      localStorage[key] = value;
      this.setState({changed: !this.state.changed})
    }

    render() {
        return (
          <div className="profile__information">
            <h3 className="profile__information_nickname">{this.user.nickname}</h3>

            <div className="profile__information_wrapper">
              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title" htmlFor="name">Name Surname</label>
                <input className="profile__information_input disabled" value={this.user.name} id="name" type="text" disabled ref={this.user.name} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
              </div>

              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title" htmlFor="email">Email</label>
                <input className="profile__information_input disabled"value={this.user.email} id="email" type="email" value={this.user.email} disabled ref={this.user.email} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
              </div>

              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title" htmlFor="age">Age</label>
                <input className="profile__information_input disabled" value={this.user.age} id="age" type="number" min="0" max="100" disabled ref={this.user.age} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
              </div>

              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title" htmlFor="city">City</label>
                <input className="profile__information_input disabled" value={this.user.city} id="city" type="text" disabled ref={this.user.city} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
              </div>

              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title">Gender</label>
                <SelectGender disabled={this.state.disabled} value={this.user.genre} setGender={this.setUserInfo}/>
              </div>

              <div className="profile__information_input_wrapper">
                <label className="profile__information_input_title" htmlFor="media">Media</label>
                <input className="profile__information_input disabled" value={this.user.media} id="media" type="text" disabled ref={this.user.media} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
              </div>
            </div>

            <div className="profile__information_textarea_wrapper">
                <label className="profile__information_input_title" htmlFor="about">About me</label>
                <textarea value={this.user.about} id="about"className="profile__information_textarea disabled" disabled ref={this.user.about} onChange={(event) => this.setUserInfo(event.target.getAttribute("id"), event.target.value)}/>
            </div>

            <div className="profile__information_btn_wrapper">
              <button className="profile__information_btn button" onClick={this.changeInfo}>
                {this.state.disabled ? "Change information" : "Confirm"}
              </button>
            </div>
          </div>
        )
    }
}

export default Information;