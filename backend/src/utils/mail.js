const sgMail = require('@sendgrid/mail');
const { ENV } = require('./constants');

sgMail.setApiKey(ENV.SG_API_KEY);

class Email {
  constructor(recipientAddress, recipientName, templateId, templateData) {
    this.to = recipientAddress;
    this.name = recipientName;
    this.fromEmail = 'noreply@noreplytest.tk';
    this.fromName = 'eCommerce';
    this.templateId = templateId;
    this.dynamicTemplateData = templateData;
  }

  async sendMails() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      templateId: this.templateId, // Here goes your template-Id
      dynamic_template_data: this.dynamicTemplateData
    };

    await sgMail.send(mailOptions).then(() => {
      console.log('Sent');
    }, console.error);
  }
}

const email = ({
  recipientAddress,
  recipientName,
  templateId,
  templateData = {}
}) => new Email(recipientAddress, recipientName, templateId, templateData);

module.exports = email;
