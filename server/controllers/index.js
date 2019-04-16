const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  console.log('amins');
  const customers = [
    { id: 1, name: 'amin' },
    { id: 2, name: 'mohammed' },
    { id: 3, name: 'abdallah' },
  ];
  res.json(customers);
});

module.exports = { router };
