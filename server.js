const express = require('express')
const app = express()
const ejs = require('ejs')
const fs = require('fs')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  var output;
  try {
    const filedata = fs.readFileSync('output.json');
    output = JSON.parse(filedata);
  } catch (error) {
    console.error(error);
  }

  const data = {
    pageTitle: 'Home Page',
    message: 'Welcome to my website!',
    author: 'John Doe',
    output: output
  }
  res.render('index', { data })
})

app.get('/messages/:dataIndex/:messageIndex', (req, res) => {
  // read the contents of the JSON file
  const jsonData = fs.readFileSync('output.json')

  // parse the JSON data
  const parsedData = JSON.parse(jsonData)

  res.render('messages', {
    jsonData: parsedData.data[req.params.dataIndex]['Bank Conversation'][req.params.messageIndex].messages,
  })
})

app.listen(8000, () => {
  console.log('Server started on port 80')
})
