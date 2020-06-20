import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import {Grid, Button, Modal, Confirm} from 'semantic-ui-react'
import Question from '../Question'
import NavButtons from '../NavButtons'
import Legend from '../Legend'
import QuestionPalette from '../QuestionPalette'
import Profile from '../Profile'
import api from '../../api'
class QUIZ extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: [0, 0, 0],
      open: false,
      score: 0
    }
    this.Timer = null;
    this.labels = ["Right answers", "Wrong answers", "Unanswered"]
    this.colors = ['green', 'red', 'grey'] 

  }

  componentDidMount(){
    this.props.fetchQuestions()
    this.startExam()
  }

  onClose = () => {
    window.location.reload()
  }

  handleNext = (event) => {
    let questionIndex = this.props.questionIndex
    let questions = this.props.questions
    let answeredIndex = questions[questionIndex].answeredIndex
    answeredIndex = answeredIndex === undefined ? -1 : answeredIndex
    this.props.updateAnswer(answeredIndex)
    questionIndex++;
    this.props.updateQuestionIndex(questionIndex)
  }

  handlePrevious = (event) => {
    let questionIndex = this.props.questionIndex
    let questions = this.props.questions
    let answeredIndex = questions[questionIndex].answeredIndex
    answeredIndex = answeredIndex === undefined ? -1 : answeredIndex
    this.props.updateAnswer(answeredIndex)
    questionIndex--;
    this.props.updateQuestionIndex(questionIndex)
  }

  handleJumpQuestion = (event) => {
    let qIndex = Number(event.target.value)
    let questionIndex = this.props.questionIndex
    let questions = this.props.questions
    if(qIndex === questionIndex) return 
    let answeredIndex = questions[questionIndex].answeredIndex
    answeredIndex = answeredIndex === undefined ? -1 : answeredIndex
    this.props.updateAnswer(answeredIndex)
    this.props.updateQuestionIndex(qIndex)
  }

  startExam = () => {
    this.setState({examStarted: true})
    this.Timer = setInterval(()=>{
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
    let questions = this.props.questions
    let graphData = [0, 0, 0]
    let score = 0
    for(let i=0; i < this.props.questions.length; i++){
      if(questions[i].answeredIndex === -1 || questions[i].answeredIndex === undefined){
        graphData[2] = graphData[2] + 1  
      }
      else if(questions[i].correctIndex === questions[i].answeredIndex){
        graphData[0] = graphData[0] + 1
        score += this.props.questions[i].marks
      }
      else{
        graphData[1] = graphData[1] + 1  
      }
    }

    api.post('/v1/users', {
      fullName: this.props.fullName,
      emailId: this.props.emailId,
      score: score,
      rightAnswered: graphData[0],
      wrongAnswered: graphData[1],
      notAnswered: graphData[2]
    })
    .then((response) => {
      debugger
      console.log("RESPONSE :::>>>>>>>>>>>>>", response)
      if(response.status === 201){
        this.setState({result: graphData, open: true, score})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    this.props.setTime({ minutes: 0, seconds: 0})
    this.props.setConfirm(false)
  }

  render(){
    const { questions, questionIndex, minutes, seconds} = this.props
    return (
      <div>
        {((questions)&&(questions.length > 0))?
        <div className="quiz">
            <Grid divided>
              <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
                <Grid.Row>
                  <Question
                    question = {questions[questionIndex]}
                    questionIndex = {questionIndex}
                    handleAnswerChange = {this.props.updateAnswer}
                  />
                </Grid.Row>
                <Grid.Row>
                  <NavButtons
                    handleNext = {this.handleNext}
                    handlePrevious = {this.handlePrevious}
                    nextDisabled = {questionIndex === questions.length - 1 }
                    previousDisabled = {questionIndex === 0 }
                    handleAnswerChange = {this.props.updateAnswer} 
                    handleMarkQuestion = {this.props.setMark}
                  />
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid.Row>
                  <Profile
                    minutes = {minutes}
                    seconds = {seconds}
                    {...this.props}
                  />
                </Grid.Row>
                <Grid.Row>
                  <QuestionPalette
                    handleJumpQuestion = { this.handleJumpQuestion }
                    totalQuestions = { questions.length }
                    questions = {questions}
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
                        labels: this.labels, 
                        datasets: [{
                            data: this.state.result,
                            backgroundColor: this.colors
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
