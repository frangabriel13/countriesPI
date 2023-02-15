const { Router } = require('express');
const getActivities = require('../controllers/activityController');
const { Country, Activity } = require('../db');

const router = Router();

router.get('/activities', async (req, res) => {
  try {
    const activities = await getActivities();
    res.status(200).send(activities);
  } catch(error) {
    res.status(404).send(error);
  }
})

router.post('/activities', async(req, res) => {
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
    console.log(countryDb);
    activityCreated.addCountry(countryDb);
    res.status(200).send('Creado correctamente');
  } catch(error) {
    res.status(404).send(error);
  }
})

// router.post('/activities', async (req,res)=>{
    
//   try {
//       const  {name, difficulty, duration, season, countries} = req.body
//       const newActivity = await Activity.create({
//       name,
//       difficulty,
//       duration,
//       season
//   })

//   const countriesDb = await Country.findAll({
//       where:{
//           name: countries
//       }
//   })

//   newActivity.addCountries(countriesDb)

//   res.json('Actividad creada correctamente')

//   } catch (error) {
//       res.status(404).json(error)
//   }
// })


module.exports = router;