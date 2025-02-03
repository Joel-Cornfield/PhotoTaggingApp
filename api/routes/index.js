const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const oopsie = 'Wrong Page...'

    res.json(oopsie);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;