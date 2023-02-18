const { Router } = require('express');
// const getActivities = require('../controllers/activityController');
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");

const router = Router();

// router.get('/activities', async (req, res) => {
//   try {
//     const activities = await getActivities();
//     res.status(200).send(activities);
//   } catch(error) {
//     res.status(404).send(error);
//   }
// })

// router.post('/activities', async(req, res) => {
//   try {
//     let = {
//       name,
//       difficulty,
//       duration,
//       season,
//       countries
//     } = req.body;
//     let activityCreated = await Activity.create({
//       name,
//       difficulty,
//       duration,
//       season
//     })
//     // console.log(activityCreated); // include: undefined ?
//     let countryDb = await Country.findAll({
//       where: { name : countries }
//     })
//     // console.log(countryDb); // countries = []
//     activityCreated.addCountry(countryDb);
//     // res.status(200).send('Creado correctamente');
//     res.status(200).send(activityCreated);
//   } catch(error) {
//     res.status(404).send(error);
//   }
// })

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
    // console.log(activityCreated); // include: undefined ?
    let countryDb = await Country.findAll({
      where: { name : countries }
    })
    // console.log(countryDb); // countries = []
    activityCreated.addCountry(countryDb);
    // res.status(200).send('Creado correctamente');
    res.status(200).send(activityCreated);
  } catch(error) {
    res.status(404).send(error);
  }
})

module.exports = router;