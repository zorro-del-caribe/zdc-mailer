const path = require('path');
const debug = require('debug')('zdc-mailer');
const EmailTemplate = require('email-templates').EmailTemplate;

const MagicLink = {
  send({email, link}){
    return new Promise((resolve, reject) => {
      this.template.render({link}, (err, results) => {
        if (err) {
          return reject(err);
        }
        const {html}=results;
        const dataObject = Object.assign({
          from: 'Zorro del Caribe <laurent34azerty@gmail.com>',
          subject: '[zorro-del-caribe] login request',
        }, {to: [email], html});
        this.transporter.sendMail(dataObject, function (err, info) {
          if (err) {
            return reject(err);
          }
          const {response} = info;
          debug(response.toString());
          return resolve(info);
        });
      });
    });
  }
};

const magicLinkTemplate = new EmailTemplate(path.join(__dirname, '../', 'templates', 'magic_link'));

module.exports = function ({templateType, transporter}) {
  switch (templateType) {
    case 'magic_link':
      return Object.create(MagicLink, {transporter: {value: transporter}, template: {value: magicLinkTemplate}});
    default:
      return null;
  }
};