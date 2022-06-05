import './App.css';
import React, { Component } from 'react'
const axios = require('axios').default;

class App extends Component {

  componentDidMount = () => {
    axios.get('/api')
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App

