const axios = require('axios');
const { Country, Activity } = require('../db');
// const { Op, Sequelize } = require('sequelize');

const apiInfo = async () => {
  const url = await axios.get('https://restcountries.com/v3/all');
  const info = await url.data.map(el => {
    return {
      id: el.cca3,
      name: el.name.common,
      flag: el.flags[0],
      continent: el.continents[0],
      capital: el.capital ? el.capital[0] : 'No tiene capital',
      subregion: el.subregion,
      area: el.area,
      population: el.population
    }
  })
  return info;
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

const allCountries = async () => {
  const api = await apiInfo();
  const db = await dbInfo();
  const allInfo = api.concat(db);
  return allInfo;
}

module.exports = {
  allCountries
}