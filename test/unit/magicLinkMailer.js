const test = require('tape');
const mailer = require('../../lib/mailer');

test('Send a magic link request email', t=> {
  const transporterMock = {
    sendMail(object, cb){
      cb(null, {response: object});
    }
  };
  const magicLinkMailer = mailer({
    templateType: 'magic_link',
    transporter: transporterMock
  });

  magicLinkMailer.send({link: 'http://example.com', email: 'foo@bar.com'})
    .then(res=> {
      t.deepEqual(res.response, {
          from: 'Zorro del Caribe <laurent34azerty@gmail.com>',
          html: '<p>Hello !</p><p>You have requested to login into Zorro del Caribe, please follow the<a href="http://example.com"> magic link</a></p>',
          subject: '[zorro-del-caribe] login request',
          to: ['foo@bar.com']
        }
      );
      t.end();
    })
    .catch(t.end);
});

test('Reject if the transporter throw an error', t=> {
  const transporterMock = {
    sendMail(object, cb){
      cb({message: 'foo bar error'});
    }
  };
  const magicLinkMailer = mailer({
    templateType: 'magic_link',
    transporter: transporterMock
  });

  magicLinkMailer.send({link: 'http://example.com', email: 'foo@bar.com'})
    .then(res=> {
      t.fail();
    })
    .catch(err=> {
      t.equal(err.message, 'foo bar error');
      t.end();
    });
});