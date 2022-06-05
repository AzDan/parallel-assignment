const express = require('express')
const fs = require('fs')
const app = express()
const port = 5000

readJsonFile = () => {
  let rawdata = fs.readFileSync('data.json');
  let jsonData = JSON.parse(rawdata);
  return jsonData;
}

getPageAndTimeVisitFrequency = (rawData) => {
  var pageVisits={"A":0,"B":0,"C":0,"D":0,"E":0,"F":0,"G":0,"H":0,"I":0,"J":0}
  var timeVisits={
    "00":0,
    "01":0,
    "02":0,
    "03":0,
    "04":0,
    "05":0,
    "06":0,
    "07":0,
    "08":0,
    "09":0,
    "10":0,
    "11":0,
    "12":0,
    "13":0,
    "14":0,
    "15":0,
    "16":0,
    "17":0,
    "18":0,
    "19":0,
    "20":0,
    "21":0,
    "22":0,
    "23":0
  }
  rawData.forEach((item) => {
    var day = new Date(item.timestamp).getDate();
    if(day==1) {
      pageVisits[item.pageTitle]++;
    }
    timeVisits[item.timestamp.substring(11,13)]++
  })

  const pageAndTime = {
    pageVisits: {
      keys: Object.keys(pageVisits),
      values: Object.values(pageVisits)
    },
    timeVisits: {
      keys: Object.keys(timeVisits),
      values: Object.values(timeVisits)
    }
  }

  return pageAndTime;
}

generateBarGraphData = () => {
  var jsonData = readJsonFile();
  var pageAndTimeVisitFrequency = getPageAndTimeVisitFrequency(jsonData);
  

  const pageVisits = {
    labels: pageAndTimeVisitFrequency.pageVisits.keys,
    datasets: [{
      label: 'Most site visits on 2022-01-01',
      data: pageAndTimeVisitFrequency.pageVisits.values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(201, 203, 207, 0.6)',
        'rgba(147, 190, 40, 0.6)',
        'rgba(190, 20, 50, 0.6)',
        'rgba(255, 20, 100, 0.6)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(147, 190, 40)',
        'rgb(190, 20, 50)',
        'rgb(255, 20, 100)'
      ],
      borderWidth: 1
    }]
  }

  const timeVisits = {
    labels: [
      '12am-1am',
      '1am-2am',
      '2am-3am',
      '3am-4am',
      '4am-5am',
      '5am-6am',
      '6am-7am',
      '7am-8am',
      '8am-9am',
      '9am-10am',
      '10am-11am',
      '11am-12pm',
      '12am-1pm',
      '1pm-2pm',
      '2pm-3pm',
      '3pm-4pm',
      '4pm-5pm',
      '5pm-6pm',
      '6pm-7pm',
      '7pm-8pm',
      '8pm-9pm',
      '9pm-10pm',
      '10pm-11pm',
      '11pm-12am',
    ],
    datasets: [{
      label: 'Time period of visit',
      data: pageAndTimeVisitFrequency.timeVisits.values,
      backgroundColor: [
        'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  }

  const totalData = {
    pageVisitData: pageVisits,
    timeVisitData: timeVisits,
    rawData: jsonData
  }

  return totalData;
}

app.get('/api', (req, res) => {
  var jsonData = generateBarGraphData();
  res.send(jsonData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})