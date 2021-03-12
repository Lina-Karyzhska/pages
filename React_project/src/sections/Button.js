import React, { Component } from 'react';

class Button extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
          <div className="filmlist__button">
            <button onClick={this.props.handleClick} className="button">{this.props.inner}</button>
          </div>
        )
    }
}

export default Button;