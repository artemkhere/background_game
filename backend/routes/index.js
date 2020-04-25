import express from 'express';

const router = express.Router();

router.get('/api/login', (req, res) => {
  console.log('hit that')
  res.send({ response: 'I am alive' }).status(200);
});

router.post('/api/login', (req, res) => {
  console.log('hit that')
  res.send({ response: 'I am alive' }).status(200);
});

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
