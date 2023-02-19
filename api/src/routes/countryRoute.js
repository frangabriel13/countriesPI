const { Router } = require('express');
const { apiInfo, dbInfo, getCountryByID } = require('../controllers/countryController');
const { Country, Activity } = require('../db');

const router = Router();

router.get('/countries', async (req, res) => {
  const name = req.query.name

  try {
    const countriesDb = await Country.count()
    if(countriesDb < 1) {
      await apiInfo()
    }

    if(name) {
      const response =  await Country.findAll({
        include: {
          model: Activity,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      })
      let countryName = await response.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
      countryName.length ?
      res.status(200).send(countryName) :
      res.status(404).send('El nombre ingresado no coincide con el de ningún país')
    } else {
      const data = await dbInfo()
      res.status(200).send(data);
    }
  }
  catch(error) {
    return error;
  }
})

router.get("/countries/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const result = await getCountryByID(id.toUpperCase(), {
      include: [Activity],
    });
    if(result) {
      res.status(200).send(result);
    } else {
      res.status(400).send('El ID ingresado no coincide con el de ningún país');
    }
  } catch (error) {
    return error;
  }
});

module.exports = router;
