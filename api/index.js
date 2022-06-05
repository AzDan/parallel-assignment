const express = require('express')
const fs = require('fs')
const app = express()
const port = 5000

readJsonFile = () => {
  let rawdata = fs.readFileSync('data.json');
  let jsonData = JSON.parse(rawdata);
  return jsonData;
}

app.get('/api', (req, res) => {
  var jsonData = readJsonFile();
  res.send(jsonData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})