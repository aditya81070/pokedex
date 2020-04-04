let router = require('express').Router();
const controller = require('./controllers/pokemonController');

router.get('/', (req, res) => {
  res.json({
    status: 'API Its working',
    message: 'Welcome to pokedex server',
  });
});

router.route('/pokemons').get(controller.getPokemons).post(controller.addPokemon);
router
  .route('/pokemons/:id')
  .get(controller.findPokemon)
  .delete(controller.removePokemon)
  .put(controller.updatePokemon);
module.exports = router;
