require('dotenv').config();
const { sendEmail, getEmailTemplate, getReceivingAddressFromRequest } = require('./index');
const fs = require('fs');

describe('getEmailTemplate', () => {
  it('should include the given content', async () => {
    const emailContent = getEmailTemplate({
      greetings: 'Hi there,',
      message: 'Discover the most popular search engine',
      href: 'https://www.google.com',
      action: 'Visit now!',
    });
    expect(emailContent).toContain('Hi there,')
    expect(emailContent).toContain('Discover the most popular search engine')
    expect(emailContent).toContain('https://www.google.com')
    expect(emailContent).toContain('Visit now!')
    fs.writeFileSync('./artifacts/email.html', emailContent)
  })
})

describe('sendEmail', () => {
  it('should send an email', async () => {
    const response = await sendEmail({
      subject: 'subject',
      htmlContent: '<html><body>This is a test message</body></html>',
      to: 'lennert_vansever1@hotmail.be'
    });
    expect(response).toContain('API called successfully.');
  })
})