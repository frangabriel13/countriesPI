const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

router.post('/activities', async (req, res) => {
  try {
    let = {
      name,
      difficulty,
      duration,
      season,
      countries
    } = req.body;
    let activityCreated = await Activity.create({
      name,
      difficulty,
      duration,
      season
    })
    let countryDb = await Country.findAll({
      where: { name : countries }
    })
    activityCreated.addCountry(countryDb);
    res.status(200).send('Actividad turística creada con éxito');
  } catch(error) {
    res.status(404).send(error);
  }
})

module.exports = router;