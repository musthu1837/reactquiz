import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import {Menu, Grid, Button, Modal, Image, Confirm} from 'semantic-ui-react'
import './App.css';
import Question from './Components/Question'
import NavButtons from './Components/NavButtons'
import Legend from './Components/Legend'
import QuestionPalette from './Components/QuestionPalette'
import Profile from './Components/Profile'
import data from './data.json'
import answers from './answers.json'
import quizimage from './Components/asserts/images/quiz.png'
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
      result: [8, 2, 2],
      open: false,
      score: 0,
      confirm: false
    }
    this.Timer = null;
  }
  
  componentDidMount(){
    // let response = window.onbeforeunload = () => "Dude, are you sure you want to leave? Think of the kittens!"
    // alert(response)
  }

  onClose = () => {
    // this.setState({ open: false, examStarted: false, score: 0 })
    window.location.reload();
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
          this.evaluateExam(null)   
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
    let graphData = [0, 0, 0]
    let score = 0
    for(let i=0; i < GSlength; i++){
      if(answers.GS[i].answeredIndex === -1 || answers.GS[i].answeredIndex === null){
        graphData[2] = graphData[2] + 1  
      }
      else if(data.GS[i].correctIndex === answers.GS[i].answeredIndex){
        graphData[0] = graphData[0] + 1
        score += data.GS[i].marks
      }
      else{
        graphData[1] = graphData[1] + 1  
      }
    }
    this.setState({result: graphData, minutes: GSlength, seconds: 0, open: true, score, confirm: false})
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
                <Button color="red" onClick={(e) => this.setState({confirm: true})}>Finish</Button>               
              </Menu.Item>: 
              <Menu.Item>
                <Button color="green" onClick={this.startExam}>Start</Button>
              </Menu.Item>
            }           
          </Menu.Menu>
        </Menu>
        <br/>
        {this.state.examStarted ? (<Grid divided>
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
        </Grid>):(<center><br/><br/><br/><Image src = {quizimage} alt = 'quizimage'/></center>)}

        <Modal 
            style={{"width": "500px"}} 
            open={this.state.open}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            onClose={this.close}
            >
            <Modal.Header>
              <h2 style={{"color": "green"}}>Your Score is: {this.state.score}</h2>
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
                  <br/>
                  <center><Button color="blue" onClick={this.onClose}>Ok</Button></center>
                </p>
              </Modal.Description>
            </Modal.Content>
          </Modal> 
          <Confirm
          open={this.state.confirm}
          onCancel={(e) => this.setState({confirm: false})}
          onConfirm={(e) => this.evaluateExam()}
          content={'Are you sure want to submit?'}
          />
      </div>
    );
  }
}

export default App;
