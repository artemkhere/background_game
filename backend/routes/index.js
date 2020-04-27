import express from 'express';

const router = express.Router();

router.get('/api/login', (req, res) => {
  console.log('hit that')
  res.send({ response: 'I am alive' }).status(200);
});

router.post('/api/signup', (req, res) => {
  console.log('hit that')
  console.log(req.body)
  // validate data with validator.js
  // see if user with that email already exitst with pg promise
  // hash password with salt with bcrypt
  // create user with that password hash
  // return success message with user id
  // login that user in the future and give jwt
  res.send({ response: 'I am alive' }).status(200);
});

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
