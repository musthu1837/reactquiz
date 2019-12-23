import React, { Component } from 'react';
import {Menu, Grid} from 'semantic-ui-react'
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
      answers: answers
    }
  }
  
  handleNext = (questionIndex) => {
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: questionIndex + 1 , answers})
  }

  handlePrevious = (questionIndex) => {
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: questionIndex - 1 , answers})
  }

  handleChangeAnswer = (questionIndex, answeredIndex) => {
    let answers = this.state.answers
    answers.GS[questionIndex].answeredIndex = answeredIndex
    this.setState({answers: answers})
  }

  handleChangeQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: event.target.value, answers})
  }

  render(){
    return (
      <div className="App">
        <Menu size='massive'>
          <Menu.Item
            name='React QUIZ'
          />
        </Menu>
        <br/><br/>
        <Grid divided>
          <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
            <Grid.Row>
              <Question
                question = {data.GS[this.state.questionIndex]}
                answer = {this.state.answers.GS[this.state.questionIndex]}
                index = {this.state.questionIndex}
                handleAnswerChange = {this.handleChangeAnswer}
              />
            </Grid.Row>
            <Grid.Row>
              <NavButtons
                nextQuestion={this.handleNext}
                previousQuestion={this.handlePrevious}
                nextDisabled = {this.state.questionIndex === GSlength - 1 }
                previousDisabled = {this.state.questionIndex === 0 }
                handleAnswerChange = {this.handleChangeAnswer} 
                index = {this.state.questionIndex}               
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Profile/>
            </Grid.Row>
            <Grid.Row>
              <QuestionPalette
                changeQuestionIndex = { this.handleChangeQuestion }
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
