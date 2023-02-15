const { Router } = require('express');
const { allCountries } = require('../controllers/countryController');

const router = Router();

router.get('/countries', async (req, res) => {
  const name = req.query.name
  let countries = await allCountries();
  if(name) {
    let countryName = await countries.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    countryName.length ?
    res.status(200).send(countryName) :
    res.status(404).send('El país no existe')
  } else {
    res.status(200).send(countries);
  }
})

router.get('/countries/:id', async (req, res) => {
  const id = req.params.id;
  const countries = await allCountries();
  if(id) {
    let countryId = await countries.filter(el => el.id.toLowerCase() == id.toLowerCase());
    countryId.length ?
    res.status(200).send(countryId) :
    res.status(404).send('No se encontró el país')
  }
})

module.exports = router;
