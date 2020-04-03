let router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: 'API Its working',
    message: 'Welcome to pokedex server',
  });
});

module.exports = router;
