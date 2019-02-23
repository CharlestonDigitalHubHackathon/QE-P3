require('dotenv').config()
const Airtable = require('airtable')

module.exports = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base(process.env.AIRTABLE_BASE)
