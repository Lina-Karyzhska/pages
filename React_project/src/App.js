import './styles/dist/style.css';
import React, { Component } from 'react';
import Header from './Header/Header';
import Main from './Main';

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: "",
        isAuthenticated: false,
        favFilmsShown: false,
      }
    }

    getTitle = (title) => {
      if (document.querySelector(".fav__btn .button") && document.querySelector(".fav__btn .button").innerText == "Hide") {
        this.setState({title: title, favFilmsShown: true});
      } else {
        this.setState({title: title, favFilmsShown: false});
      }
    }

    registration = (bool) => {
      this.setState({isAuthenticated: bool});
    }

    render() {
        return (
          <>
            <Header handleAuth={this.registration} handleChange={this.getTitle}/>
            <Main title={this.state.title} favFilmsShown={this.state.favFilmsShown}/>
          </>
        )
    }
}

export default App;