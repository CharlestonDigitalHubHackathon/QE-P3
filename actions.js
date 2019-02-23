const db = require('./clients/airtable')

// All of these actions should return a promise
module.exports = {
  createStudent,
}

function createStudent({ age, phoneNumber }) {
  return db('students').create({
    age: age,
    phone_number: phoneNumber
  })
}
