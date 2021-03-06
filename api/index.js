const express = require('express')
const bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 8080
const app = express()
const { createStudent, startConversation} = require('./lib/actions')
const { getOtherNumber} = require('./lib/queries')
const {sendInitialConvo, passAlong} = require('./lib/processTutorRequest')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.get('/', (req, res) => {
  console.log(process.env.TWILIO_ACCOUNT_SID)
  res.json({message: "You have reached the server"})
})
app.post('/api/webhook', (req, res) => {
  if (
    req.body.queryResult.fulfillmentText ===
    "Cool. Now that I know your age and the subject you want to learn, I'll have a tutor contact you shortly."
  ) {
    const { Subject, Age } = req.body.queryResult.parameters
    const phoneNumber = req.body.originalDetectIntentRequest.payload.data.To

    startConversation({student: phoneNumber, tutor: '+12058072847', subject: Subject})
      // console.log('RESPONSE FROM AIRTABLE >>>> ', responseFromAirTable)
      const convoObj = {
        to: phoneNumber,
        subject: Subject
      }
    sendInitialConvo(convoObj)

    
    console.log('subject: ', Subject)
    console.log('Age: ', Age)
    console.log('Phone Number: ', phoneNumber)

    res.status(200).json({ Subject, Age, phoneNumber })
  } else {
    console.log('NO NEED TO SEND')
    res.status(418).json({ message: 'I AM TEAPOT' })
  }
})
app.post('/api/twilio/webhook', (req, res) => {
  
  console.log(req.body, Date.now())
  getOtherNumber(req.body.From).then(resp => {
    console.log('other number', resp)
  })
  const resp = new MessagingResponse();
  resp.message('Thanks for saying hi!');
  
  res.status(200).send(resp.toString())
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
