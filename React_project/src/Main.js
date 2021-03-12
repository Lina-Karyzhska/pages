import React, { Component } from 'react';
import Section from './sections/Section';

class Main extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
          <main>
            <Section isFirst={true}/>
            <Section title={this.props.title} isFirst={false} favFilmsShown={this.props.favFilmsShown}/>

            { localStorage.isAuthenticated == "false" && 
            <div className="modal">
              <p>You can create favourite list after registration</p>
            </div> }
          </main>
        )
    }
}

export default Main;