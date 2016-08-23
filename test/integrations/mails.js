const test = require('tape');
const appFactory = require('../../app');
const req = require('supertest');

test('send email to forwarded recipient', t=> {
  const app = appFactory();
  app.start()
    .then(function () {
      req(app.server)
        .post('/mails/magic_link')
        .send({email: 'foo@bar.com', link: 'http://foobar.com'})
        .expect(200)
        .end(function (err, {body}) {
          t.error(err);
          app.stop();
          t.end();
        })
    })
    .catch(t.end);
});
