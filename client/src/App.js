import './App.css';
import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const axios = require('axios').default;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      pageVisitData: {},
      timeVisitData: {},
      rawData: {},
      hasData: false
    };
  }

  componentDidMount = () => {
    axios.get('/api')
    .then((response) => {
      // handle success
      console.log(response.data);
      this.setState({
        pageVisitData: response.data.pageVisitData,
        timeVisitData: response.data.timeVisitData,
        rawData: response.data.rawData,
        hasData: true
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  render() {
    return (
      <div className='container' data-testid="container">
        {this.state.hasData &&
          <>
            <div style={{width: "600px", height: "400px"}}>
              <Bar data={this.state.pageVisitData}/>
            </div>
            
            <div style={{width: "600px", height: "400px"}}>
              <Bar data={this.state.timeVisitData}/>
            </div>
          </>
        }
      </div>
    )
  }
}

export default App

