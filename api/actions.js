const db = require('./clients/airtable')

// All of these actions should return a promise
module.exports = {
  createStudent,
  startConversation,
}

function createStudent({ age, phoneNumber }) {
  return db('students').create({
    age: age,
    phone_number: phoneNumber
  })
}

function startConversation({ student, tutor, subject }) {
  return db('conversations').create({
    student,
    subject,
    tutor,
  })
}
