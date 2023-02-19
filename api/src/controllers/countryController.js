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
      capital: el.capital ? el.capital[0] : 'No se encontró capital',
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
  return await Country.findByPk(id.toUpperCase(), {
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}


module.exports = {
  apiInfo,
  dbInfo,
  getCountryByID
}