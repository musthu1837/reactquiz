import React, { Component } from 'react';
import {Menu, Grid, Button, Modal,Image, Header} from 'semantic-ui-react'
import './App.css';
import Question from './Components/Question'
import NavButtons from './Components/NavButtons'
import Legend from './Components/Legend'
import QuestionPalette from './Components/QuestionPalette'
import Profile from './Components/Profile'
import data from './data.json'
import answers from './answers.json'
const GSlength = data.GS.length
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionIndex: 0,
      answers: answers,
      minutes:  GSlength,
      seconds: 0,
      examStarted: false
    }
  }
  
  handleNext = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(questionIndex) + 1 , answers})
  }

  handlePrevious = (event) => {
    let questionIndex = this.state.questionIndex
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(questionIndex) - 1 , answers})
  }

  handleChangeAnswer = (answeredIndex) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    answers.GS[questionIndex].answeredIndex = answeredIndex
    this.setState({answers: answers})
  }

  handleJumpQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(event.target.value), answers})
  }

  handleMarkQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    answers.GS[questionIndex].mark = (!answers.GS[questionIndex].mark)
    this.setState({answers: answers}) 
  }
  startExam = (event) => {
    this.setState({examStarted: true})
    let Class = this
    let Timer = setInterval(()=>{
      let minutes = Class.state.minutes;
      let seconds = Class.state.seconds;
      if (minutes === 0 && seconds === 0) {
        clearInterval(Timer)
        window.alert("Exam is completed")
        this.setState({
          examStarted: false,
          minutes:  GSlength - 1,
          seconds: 59          
        })
      }
      else if(seconds === 0) {
        Class.setState({
          "minutes": minutes - 1,
          "seconds": 59
        })
      }
      else {
        Class.setState({
          "seconds": seconds - 1
        })      
      }

    },1000)
  }

  render(){
    return (
      <div className="App">
        <Menu size='huge'>
          <Menu.Item>
            <b>React QUIZ</b>
          </Menu.Item>
          <Menu.Menu position="right">
            {(this.state.examStarted) ? 
              <Menu.Item>
                <Modal trigger={<Button color="red">Submit</Button>} centered={false}>
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.encrypted/images/avatar/large/rachel.png'/>
                    <Modal.Description>
                      <Header>Your Result!!!!</Header>
                      <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                      </p>
                      <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>                
              </Menu.Item>: 
              <Menu.Item>
                <Button color="green" onClick={this.startExam}>Start</Button>
              </Menu.Item>
            }           
          </Menu.Menu>
        </Menu>
        <br/>
        <Grid divided>
          <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
            <Grid.Row>
              <Question
                question = {data.GS[this.state.questionIndex]}
                answer = {this.state.answers.GS[this.state.questionIndex]}
                questionIndex = {this.state.questionIndex}
                handleAnswerChange = {this.handleChangeAnswer}
              />
            </Grid.Row>
            <Grid.Row>
              <NavButtons
                handleNext = {this.handleNext}
                handlePrevious = {this.handlePrevious}
                nextDisabled = {this.state.questionIndex === GSlength - 1 }
                previousDisabled = {this.state.questionIndex === 0 }
                handleAnswerChange = {this.handleChangeAnswer} 
                handleMarkQuestion = {this.handleMarkQuestion}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Profile
                minutes = {this.state.minutes}
                seconds = {this.state.seconds}
              />
            </Grid.Row>
            <Grid.Row>
              <QuestionPalette
                handleJumpQuestion = { this.handleJumpQuestion }
                totalQuestions = { GSlength }
                answers = {answers}
              />
            </Grid.Row>
            <Grid.Row>
              <Legend/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
