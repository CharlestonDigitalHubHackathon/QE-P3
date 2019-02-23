const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())

app.post('/api/webhook', (req, res) => {
  if (
    req.body.queryResult.fulfillmentText ===
    "Cool. Now that I know your age and the subject you want to learn, I'll have a tutor contact you shortly."
  ) {
    const { Subject, Age } = req.body.queryResult.parameters
    const phoneNumber = req.body.originalDetectIntentRequest.payload.data.To

    console.log('subject: ', Subject)
    console.log('Age: ', Age)
    console.log('Phone Number: ', phoneNumber)
    res.status(200).json({ Subject, Age, phoneNumber })
  } else {
    console.log('NO NEED TO SEND')
    res.status(418).json({ message: 'I AM TEAPOT' })
  }
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
