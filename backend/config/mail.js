const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvitationEmail = async (to, listName, inviterName) =>{
    const msg = {
        to,
        form: 'noreply@example.com',
        subject: `you've been invited to collaborate on ${listName}`,
        html: `
        
        blank page
        
        `,
    };
    await sgMail.send(msg);

};
module.exports = { sendInvitationEmail };