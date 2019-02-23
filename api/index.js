const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())

app.post('/api/webhook', (req, res) => {
  const { subject, question, tuteePhoneNumber } = req.body

  res.status(200).json({ subject, question, tuteePhoneNumber })
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
