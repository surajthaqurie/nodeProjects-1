const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'surajchan68@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    });

}

/* 
Challenge: Send email to user on cancellation

    1. Setup a new function for sending an email on cancellation
        - email and name as args
    2. Include their name in the email and ask why they canceled
    3. Call it just after the account is removed
    4. Run the request and check your inbox!
*/

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'surajchan68@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodby, ${name}. I hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}