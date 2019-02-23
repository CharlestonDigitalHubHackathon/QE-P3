const express = require('express')
const bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.post('/api/webhook', (req, res) => {
  const { subject, question, tuteePhoneNumber } = req.body
  
  console.log(JSON.stringify(req.body),  "<<<<<<< logging info for webhook endpoint tensorflow!", Date.now() )
  res.status(200).json({ subject, question, tuteePhoneNumber })
})
app.post('/api/twilio/webhook', (req, res) => {
  
  console.log(req.body, Date.now())
  const resp = new MessagingResponse();
  resp.message('Thanks for saying hi!');
  
  res.status(200).send(resp.toString())
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
