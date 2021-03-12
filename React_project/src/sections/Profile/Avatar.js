import React, { Component } from 'react';

class Avatar extends Component {
    constructor(props){
      super(props);
    }

    getImage(event) {
      let canvas = document.getElementById('canvasAvatar');
      let context = canvas.getContext("2d");
      let img = new Image();

	    let files = event.target.files;
	    let file = files[0];

	    if (file.type.match('image.*')) {
	      let reader = new FileReader();
	      reader.readAsDataURL(file);

	    	reader.onload = function(event) {
	    		if (event.target.readyState == FileReader.DONE) {
	    			img.src = event.target.result;
            localStorage.imgSrc = event.target.result
				    img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
			    }
	    	}    
      } else {
	      alert("not an image");
	    }
    }

    componentDidMount() {
      let canvas = document.getElementById('canvasAvatar');
      let context = canvas.getContext("2d"); 

      if (localStorage.imgSrc) {
        let img = new Image();
        img.src = localStorage.imgSrc;
        img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    render() {
        return (
          <div className="profile__avatar">
            <canvas className="profile__avatar_canvas" id="canvasAvatar"></canvas>
            <label className="button profile__avatar_btn" htmlFor="avatar_input">Load</label>
            <input className="profile__avatar_input" id="avatar_input" type="file" onChange={this.getImage}/>
          </div>
        )
    }
}

export default Avatar;