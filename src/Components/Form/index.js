import React from 'react'
import { Form } from 'semantic-ui-react'
import './form.css'
class UserForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  validateEmail = () => {
      if(this.props.emailId === "" )
        return true
      else {
        let REGX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        if(!REGX.test(this.props.emailId))
          return true
      }
      return false
  }
  render(){
    console.log(this.props.emailId.split("@"))
    return(
        <div className="userForm">
          <Form>
            <Form.Field error={this.props.fullName === ""}>
              <label>Full name:</label>
              <input 
                placeholder = 'Enter your full name' 
                value = {this.props.fullName}
                onChange = {(e) => this.props.setFullName(e.target.value)}
              />
            </Form.Field>
            <Form.Field error={this.validateEmail()}>
              <label>Email:</label>
              <input 
                placeholder = 'Enter your email address' 
                value = {this.props.emailId}
                onChange={(e) => this.props.setEmailId(e.target.value)}
              />
            </Form.Field>
          </Form>
        </div>
          )
  }
}

export default UserForm