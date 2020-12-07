const fs = require('fs')
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


const sendEmail = async ({ subject, htmlContent, sender = { name: 'valid', email: 'valid@valid.com' }, to }) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail = {
    ...sendSmtpEmail,
    subject,
    htmlContent,
    sender,
    to: [{ email: to }],
  };
  
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return `API called successfully. Returned data: ${JSON.stringify(data)}`;
  } catch(error) {
    console.log(error);
    return error;
  }
}

const getEmailTemplate = (content) => {
  const data = fs.readFileSync('./mail/template.html');
  let template = data.toString();
  Object.keys(content).forEach(key => {
    const value = content[key];
    template =  template.replace(`$${key.toUpperCase()}`, value)
  })
  return template;
}

const getReceivingAddressFromRequest = (req) => {
  return req.body.event.data.new.email;
}

module.exports = {
  sendEmail,
  getEmailTemplate,
  getReceivingAddressFromRequest
}
