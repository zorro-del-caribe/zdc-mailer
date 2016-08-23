const nodemailer = require('nodemailer');
const debug = require('debug')('zdc-mailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

module.exports = {
  priority: 400,
  init(app){
    const {conf} = app.context;
    const transport = conf.value('mailer.transport');

    debug('registering transport: ' + transport.package);
    const factory = require(transport.package);
    const transporter = nodemailer
      .createTransport(factory(transport.options || {}));

    transporter.use('compile', htmlToText());

    app.context.mailer = {
      transporter
    };

    return app;
  }
};