import React from 'react'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'
import './form.css'
class UserForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onNext = (e) => {
    e.preventDefault()
    if(this.props.fullName === "" || this.props.emailId === "")
      return
    this.props.setTab(2)
  }
  render(){
    console.log(this.props.emailId.split("@"))
    return(
        <div className="userForm">
          <Form>
            <Form.Field error={this.props.fullName === ""}>
              <label>Full name:</label>
              <input 
                placeholder = 'First Name' 
                value = {this.props.fullName}
                onChange = {(e) => this.props.setFullName(e.target.value)}
              />
            </Form.Field>
            <Form.Field error={this.props.emailId === ""  || this.props.emailId.split("@").length < 2}>
              <label>Email:</label>
              <input 
                placeholder = 'Last Name' 
                value = {this.props.emailId}
                onChange={(e) => this.props.setEmailId(e.target.value)}
              />
            </Form.Field>
            <Button onClick= {this.onNext}>Next</Button>
          </Form>
        </div>
          )
  }
}

export default UserForm