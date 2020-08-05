const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Express js started!");
});

module.exports = router;