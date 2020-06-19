import React, { Component } from 'react';
import {Menu, Button, Image, Step, Icon} from 'semantic-ui-react'

import quizimage from './asserts/images/quiz.png'
import Quiz from './Components/Quiz'
import UserForm from './Components/Form'
import Instructions from './Components/Instructions'
import { connect } from 'react-redux'
import * as QuizActions from './Redux/Actions/quiz-actions'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirm: false
    }
    this.Timer = null;
  }
  
  setConfirm = (value) => this.setState({confirm: value})
  
  validateForm= () => {
    if(this.props.emailId === "" || this.props.fullName === "")
      return true
    else {
      let REGX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
      if(!REGX.test(this.props.emailId))
        return true
    }
    return false
}
  render(){
    console.log(this.props)
    return (
      <div className="App">
        <Menu size='huge'>
          <Menu.Item>
            <b>React QUIZ</b>
          </Menu.Item>
          <Menu.Menu position="right">
            {(this.props.tab === 3) ? 
              <Menu.Item>
                <Button color="red" onClick={(e) => this.setState({confirm: true})}>Finish</Button>               
              </Menu.Item>: (false)
            }           
          </Menu.Menu>          
        </Menu>
        { (this.props.tab > 0 && this.props.tab < 3)?       
            <div>
              <br/>
              <center>
                <Icon onClick={(e) => this.props.setTab(this.props.tab-1)} disabled={this.props.tab === 1} color={"blue"} style={{position: "relative",top: "-7px"}} name={"angle left"} size={"huge"}/>               
                <Step.Group ordered>
                  <Step completed = {this.props.tab === 2}>
                    <Step.Content>
                      <Step.Title>Details Entering</Step.Title>
                      <Step.Description>Enter your fullname & email</Step.Description>
                    </Step.Content>
                  </Step>

                  <Step completed = {this.props.tab === 2}>
                    <Step.Content>
                      <Step.Title>Instructions</Step.Title>
                      <Step.Description>Read the follwing instructions</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
                <Icon disabled={this.props.tab > 1 && this.validateForm()} onClick={(e) => this.props.setTab(this.props.tab+1)} color={"blue"} style={{position: "relative",top: "-7px"}} name={"angle right"} size={"huge"}/>
              </center>
              <br/><br/>
            </div>: (false)
        }
        {(this.props.tab === 0)
          ?<center>
            <br/><br/><br/>
            <Image src = {quizimage} alt = 'quizimage'/>
            <br/>
            <Button primary onClick={(e) => this.props.setTab(1)}>START</Button>
          </center>
          :(this.props.tab === 1) 
          ? (<UserForm {...this.props}/>)          
          :(this.props.tab === 2)
          ?<Instructions setTab = {this.props.setTab}/>
          :(this.props.tab === 3)
          ? <Quiz 
              {...this.state} 
              {...this.props}
              setConfirm = {this.setConfirm}
              setTab = {this.props.setTab}
            />
          : (false)
        }   
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      questions: state.quiz.questions,
      minutes: state.quiz.minutes,
      seconds: state.quiz.seconds,
      tab: state.quiz.tab,
      fullName: state.quiz.fullName,
      emailId: state.quiz.emailId,
      questionIndex: state.quiz.questionIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchQuestions: () => dispatch(QuizActions.fetchQuestions()),
      setTime: (time) => dispatch(QuizActions.setTime(time)),
      setTab: (tabIndex) => dispatch(QuizActions.setTab(tabIndex)),
      setFullName: (fullName) => dispatch(QuizActions.setFullName(fullName)),
      setEmailId: (emailId) => dispatch(QuizActions.setEmailId(emailId)),
      updateAnswer: (answer) => dispatch(QuizActions.updateAnswer(answer)),
      updateQuestionIndex: (qIndex) => dispatch(QuizActions.updateQuestionIndex(qIndex)),
      setMark: (marked) => dispatch(QuizActions.setMark(marked))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
