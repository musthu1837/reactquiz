import React from 'react';
import {Item} from 'semantic-ui-react'
import userIcon from '../../asserts/images/usericon.png'
import './profile.css'
const Profile = (props) => {
  const { minutes, seconds, fullName} = props
  return(
      <div className="profile-main-container">
        <Item.Group>
          <Item>
            <Item.Image className="profile-image" size='tiny' src={userIcon} alt="usericon"/>
            <Item.Content 
              header={<h3 style={{color: minutes === 0 ? 'red': 'black'}} className="time">{`Time Left: ${minutes <= 9 ? "0"+minutes: minutes}:${seconds <= 9 ? "0"+seconds: seconds}`}</h3>}
              meta={fullName} />
          </Item>
        </Item.Group>
      </div>
  );
}

export default Profile;
