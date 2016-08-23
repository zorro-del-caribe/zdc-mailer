const mailer = require('../lib/mailer');

exports.magicLink = {
  path: '/magic_link',
  method: 'post',
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      link: {
        type: 'string',
        format: 'uri'
      }
    },
    required: ['email', 'link']
  },
  handler: function * () {
    const {email, link} = this.request.body;
    const {transporter} = this.app.context.mailer;
    const sender = mailer({templateType: 'magic_link', transporter});
    this.body = yield sender.send({email, link});
  }
};