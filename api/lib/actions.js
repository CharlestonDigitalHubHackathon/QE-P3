const db = require('../clients/airtable')

// All of these actions should return a promise
module.exports = {
  createEvent,
  createStudent,
  startConversation,
}

function createStudent({ age, phoneNumber }) {
  return db('students').create({
    age: age,
    phone_number: phoneNumber
  })
}

/**
 * create and store an event in events table
 *
 * data - plain old json object (will be converted to json)
 */
function createEvent(data) {
  return db('events').create({
    data: JSON.stringify(data)
  })
}

function startConversation({ student, tutor, subject }) {
  return db('conversations').create({
    student,
    subject,
    tutor,
  })
}
