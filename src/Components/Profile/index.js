import React, { Component } from 'react';
import {Item} from 'semantic-ui-react'
import './profile.css'
class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
        <div className="profile-main-container">
          <Item.Group>
            <Item>
              <Item.Image size='tiny' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ9ruNvSkRedN7TcZOOLxPLjT9PPK_T7VwHXk-v-F95yPhQCSYCQ&s' />
              <Item.Content header='Time Left: 28:28' meta='Musthafa Mohammad' />
            </Item>
          </Item.Group>
        </div>
    );
  }
}

export default Profile;