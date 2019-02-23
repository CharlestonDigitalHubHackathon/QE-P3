// request comes in
// find tutor
// take data and 


const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.export = {
    sendInitialConvo,
    passAlong
}


function sendInitialConvo({to, subject }) {
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
    })

}

function passAlong({to,from, msg})

function sendMSG({to, from, msg}) {

   return twilio.messages
    .create({
       body: msg,
      from,
       to
     })
    .then(message => console.log(message.sid));

}

