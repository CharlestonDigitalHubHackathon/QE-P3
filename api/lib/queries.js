const db = require('../clients/airtable')
const { find } = require('ramda')

module.exports = {
  getOtherNumber,
}

function getOtherNumber(fromNumber) {
  return new Promise((resolve, reject) => {
    db('conversations')
      .select({ view: 'Grid view' })
      .firstPage((err, records) => {
        records.forEach(rec => {
          const studentNumber = rec.get('student')
          const tutorNumber = rec.get('tutor')

          if (studentNumber === fromNumber) {
            resolve(studentNumber)
          }
          if (tutorNumber === fromNumber) {
            resolve(tutorNumber)
          }
        })

        resolve(null)
      })
  })
}
