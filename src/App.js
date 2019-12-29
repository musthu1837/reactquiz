import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import {Menu, Grid, Button, Modal, Image, Header} from 'semantic-ui-react'
import './App.css';
import Question from './Components/Question'
import NavButtons from './Components/NavButtons'
import Legend from './Components/Legend'
import QuestionPalette from './Components/QuestionPalette'
import Profile from './Components/Profile'
import data from './data.json'
import answers from './answers.json'

const labels = ["Right answers", "Wrong answers", "Unanswered"]
const colors = ['green', 'red', 'grey'] 
const GSlength = data.GS.length

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionIndex: 0,
      answers: answers,
      minutes:  GSlength,
      seconds: 0,
      examStarted: false,
      result: [8, 2, 2]
    }
    this.Timer = null;
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
    this.Timer = setInterval(()=>{
      let minutes = Class.state.minutes;
      let seconds = Class.state.seconds;
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.Timer)
        window.alert("Exam is completed")
        this.setState({
          examStarted: false,
          minutes:  GSlength,
          seconds: 0          
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

  evaluateExam = (event) => {
    clearInterval(this.Timer)
    let data1 = [0, 0, 0]
    for(let i=0; i < GSlength; i++){
      if(answers.GS[i].answeredIndex == -1 || answers.GS[i].answeredIndex == null){
        data1[2] = data1[2] + 1  
      }
      else if(data.GS[i].correctIndex == answers.GS[i].answeredIndex){
        data1[0] = data1[0] + 1  
      }
      else{
        data1[1] = data1[1] + 1  
      }
    }
    this.setState({result: data1, minutes: GSlength, seconds: 0})
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
                <Modal style={{"width": "500px"}} trigger={<Button color="red" onClick={this.evaluateExam}>Submit</Button>}>
                  <Modal.Header>
                    <h2 style={{"color": "green"}}>Your results.....</h2>
                  </Modal.Header>                  
                  <Modal.Content image>
                    <Modal.Description>
                      <p>
                        <Pie data={{
                          labels: labels, 
                          datasets: [{
                             data: this.state.result,
                             backgroundColor: colors
                          }]
                        }} 
                        />
                      </p>
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
