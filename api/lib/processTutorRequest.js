// request comes in
// find tutor
// take data and 


const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.exports = {
    sendInitialConvo,
    passAlong
}


function sendInitialConvo({to, subject }) {
    console.log('WE ARE IN SENDINITIALCONVO')
    const from = '+18432585008'
    const tutorMSG = `Your tutee has questions about ${subject}, please `
    const tuteeMSG = 'Your tutor will message you shortly.'
    const tutorMessage = {
        from,
        to: '+12058072847',
        msg: tutorMSG 
    }

    const tuteeMessage = {
        to,
        from,
        msg: tuteeMSG 
    }

    sendMSG(tutorMessage).then(resp => {
        return sendMSG(tuteeMessage)
    }).catch(e => console.log(e, 'UGH OHHHHHHHHH, couldnt send message'))

}

function passAlong({to,from, msg}) {

}

function sendMSG({to, from, msg}) {

   return twilio.messages
    .create({
       body: msg,
      from,
       to
     })
    .then(message => console.log(message.sid)).catch(e => console.log('oh no something happend and you couldnt send', e))

}

