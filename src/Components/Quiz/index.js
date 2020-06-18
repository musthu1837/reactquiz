import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import {Grid, Button, Modal, Confirm} from 'semantic-ui-react'
import Question from '../Question'
import NavButtons from '../NavButtons'
import Legend from '../Legend'
import QuestionPalette from '../QuestionPalette'
import Profile from '../Profile'
import answers from '../../answers.json'
const labels = ["Right answers", "Wrong answers", "Unanswered"]
const colors = ['green', 'red', 'grey'] 

class QUIZ extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionIndex: 0,
      answers: answers,
      result: [0, 0, 0],
      open: false,
      score: 0
    }
    this.Timer = null;
  }

  componentDidMount(){
    this.props.fetchQuestions()
    this.startExam()
  }
  onClose = () => {
    window.location.reload()
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
    let qIndex = Number(event.target.value)
    let questionIndex = this.state.questionIndex
    if(qIndex === questionIndex) return 
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: qIndex, answers})
  }

  handleMarkQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    answers.GS[questionIndex].mark = (!answers.GS[questionIndex].mark)
    this.setState({answers: answers}) 
  }

  startExam = () => {
    this.setState({examStarted: true})
    this.Timer = setInterval(()=>{
      debugger
      let minutes = this.props.minutes
      let seconds = this.props.seconds
      if (minutes === 0 && seconds === 0 ) {
          this.evaluateExam()   
      }
      else if(seconds === 0) {
        this.props.setTime({
          "minutes": minutes - 1,
          "seconds": 59
        })
      }
      else {
        this.props.setTime({
          "minutes": minutes,
          "seconds": seconds - 1
        })      
      }

    },1000)
  }

  evaluateExam = () => {
    clearInterval(this.Timer)
    let graphData = [0, 0, 0]
    let score = 0
    for(let i=0; i < this.props.questions.length; i++){
      if(answers.GS[i].answeredIndex === -1 || answers.GS[i].answeredIndex === null){
        graphData[2] = graphData[2] + 1  
      }
      else if(this.props.questions[i].correctIndex === answers.GS[i].answeredIndex){
        graphData[0] = graphData[0] + 1
        score += this.props.questions[i].marks
      }
      else{
        graphData[1] = graphData[1] + 1  
      }
    }
    this.setState({result: graphData, open: true, score})
    this.props.setTime({ minutes: 0, seconds: 0})
    this.props.setConfirm(false)
  }

  render(){
    return (
      <div>
        {((this.props.questions)&&(this.props.questions.length > 0))?
        <div className="quiz">
            <Grid divided>
              <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
                <Grid.Row>
                  <Question
                    question = {this.props.questions[this.state.questionIndex]}
                    answer = {this.state.answers.GS[this.state.questionIndex]}
                    questionIndex = {this.state.questionIndex}
                    handleAnswerChange = {this.handleChangeAnswer}
                  />
                </Grid.Row>
                <Grid.Row>
                  <NavButtons
                    handleNext = {this.handleNext}
                    handlePrevious = {this.handlePrevious}
                    nextDisabled = {this.state.questionIndex === this.props.questions.length - 1 }
                    previousDisabled = {this.state.questionIndex === 0 }
                    handleAnswerChange = {this.handleChangeAnswer} 
                    handleMarkQuestion = {this.handleMarkQuestion}
                  />
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid.Row>
                  <Profile
                    minutes = {this.props.minutes}
                    seconds = {this.props.seconds}
                    {...this.props}
                  />
                </Grid.Row>
                <Grid.Row>
                  <QuestionPalette
                    handleJumpQuestion = { this.handleJumpQuestion }
                    totalQuestions = { this.props.questions.length }
                    answers = {answers}
                  />
                </Grid.Row>
                <Grid.Row>
                  <Legend/>
                </Grid.Row>
              </Grid.Column>
            </Grid>
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
              open={this.props.confirm}
              onCancel={(e) => this.props.setConfirm(false)}
              onConfirm={(e) => this.evaluateExam()}
              content={'Are you sure want to submit?'}
              />
        </div>:<div>Loading......</div>}
      </div>
    );
  }
}

export default QUIZ;
