import dayjs from 'dayjs'

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app9TwnwaiCVjUZpL');

export const postAirTable = (userId: string, customerText: string) => base('customer-service').create([
  {
    "fields": {
      "Name": userId,
      "Status": "To do",
      "Priority": "Medium",
      "Text": customerText,
      "Start date": dayjs().format('YYYY-MM-DD HH:mm'),
      // "Assignee": {
      //   "id": "usrEuYx3TGhWp1ZHt",
      //   "email": "beehealer.official@gmail.com",
      //   "name": "힐러 비"
      // }
    }
  },
], function(err, records) {
  if (err) {
    console.error(err)
    return
  }
  records.forEach(function (record) {
    console.log(record.getId())
  })
})