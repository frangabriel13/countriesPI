const { Router } = require('express');
const { apiInfo, dbInfo, getCountryByID } = require('../controllers/countryController');
const { Country, Activity } = require('../db');

const router = Router();

router.get('/countries', async (req, res) => {
  const name = req.query.name

  // const verification = await Country.count()
  const countries = await Country.count()
  if(countries < 1) {
    await apiInfo()
  }

  // let countries = await apiInfo();
  if(name) {
    const response =  await Country.findAll({
      include: {
        model: Activity,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    }
    )
    let countryName = await response.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    countryName.length ?
    res.status(200).send(countryName) :
    res.status(404).send('El país no existe')
  } else {
    const data = await dbInfo()
    // res.json(data)
    res.status(200).send(data);
  }
})

// router.get('/countries/:id', async (req, res) => {
//   const id = req.params.id;
//   // const countries = await allCountries();

//   const countries = await Country.count();
//   if(countries < 1) {
//     await apiInfo();
//   }

//   // const data = await Country.findByPk(id, {
//   //   include: Activity
//   // })

//   // if(data) {
//   //   const response = await Country.findAll()
//   //   const countryId = await response.filter(el => el.id.toLowerCase().includes(id.toLowerCase()));
//   //   countryId ?
//   //   res.status(200).send(countryId) :
//   //   res.status(404).send('No se encuentra el país')
//   // } 
//   //   res.status(404).send('No se encuentra el país')
  

//   const data = await Country.findByPk(id, {
//     include: Activity
//   })

//   if(data){
//     // let dataId = data.dataValues.id;
//     res.status(200).send(data);
//     console.log(id);
//   }else{
//     res.status(400).send('No se encontró el país')
//   }


  // if(id) {
  //   let countryId = await countries.filter(el => el.id.toLowerCase() == id.toLowerCase());
  //   countryId.length ?
  //   res.status(200).send(countryId) :
  //   res.status(404).send('No se encontró el país')
  // }
// })

router.get("/countries/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const result = await getCountryByID(id.toUpperCase(), {
      include: [Activity],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('El país no se encuentra');
  }
});

module.exports = router;
