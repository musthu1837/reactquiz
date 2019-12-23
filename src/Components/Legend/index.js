import React, { Component } from 'react';
import {Label, Grid} from 'semantic-ui-react'
import './legend.css';

class Legend extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
        <div className="legend-main-container">
          <div className="legend-header">
            Legend:
          </div>
          <div className='legend-container'>
            <Grid>
              <Grid.Column width={8}>
                <Grid.Row>
                  <Label color="green" size="large" circular/><br/>
                  <b>Answered</b>
                </Grid.Row>
                <br/>
                <Grid.Row>
                  <Label color="purple" size="large" circular/><br/>
                  <b>Marked</b>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid.Row>
                  <Label color="red" size="large" circular/><br/>
                  <b>Not Answered</b>
                </Grid.Row>
                <br/>
                <Grid.Row>
                  <Label color="grey" size="large" circular/><br/>
                  <b>Not Visited</b>
                </Grid.Row>
              </Grid.Column>
            </Grid>
            <br/><br/>
          </div>
        </div>
    );
  }
}

export default Legend;
