const axios = require('axios');
const { Country, Activity } = require('../db');

const apiInfo = async () => {
  const url = await axios.get('https://restcountries.com/v3/all');
  const info = await url.data.map(el => {
    return {
      id: el.cca3,
      name: el.name.common,
      flag: el.flags[0],
      continent: el.continents[0],
      capital: el.capital,
      subregion: el.subregion,
      area: el.area,
      population: el.population
    }
  })
  await Country.bulkCreate(info); 
}

const dbInfo = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

const getCountryByID = async (id) => {
  try {
    return await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    return error;
  }
};

// const allCountries = async () => {
//   const api = await apiInfo();
//   const db = await dbInfo();
//   const allInfo = api.concat(db);
//   return allInfo;
// }

// function getCountries(country){
//   return{
//       id:country.cca3,
//       name:country.name.common,
//       flag:country.flags[1],
//       continent:country.continents[0],
//       capital:country.capital?country.capital[0]:'Capital not found',
//       subregion:country.subregion?country.subregion:'Subregion not found',
//       area:country.area,
//       poblation:country.population
//   }
// }

// async function getCountriesApi(){
//   const apiCountries = await axios.get('https://restcountries.com/v3/all')
//   const allCountries = await apiCountries.data
//   const countries= allCountries.map(c=>getCountries(c))
//   await Country.bulkCreate(countries).then(()=>console.log('Database loaded'))
// }

// module.exports={getCountriesApi,getCountries}


module.exports = {
  // allCountries
  apiInfo,
  dbInfo,
  getCountryByID
}