const fs = require('fs');

//Function to generate a random Date from given start and end date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//DECLARATION
let jsonArray = {data:[]};
let characters = 'ABCDEFGHIJ';
let charactersLength = characters.length;

//Loop to create 1000 objects and push them into array
for(var i = 0; i<1000; i++) {
  const obj = {
    timestamp: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 5)).toJSON(),
    userID: Math.floor((Math.random() * 100) + 1),
    pageTitle: characters.charAt(Math.floor(Math.random() * charactersLength)) 
  }
  jsonArray.data.push(obj);
}

var jsonContent = JSON.stringify(jsonArray);

fs.writeFile("../api/data.json", jsonContent, 'utf8', function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});