const { Country, Activity } = require('../db');

// const getActivities = async () => {
//   try {
//     let activities = await Activity.findAll({
//       include: {
//         model: Country,
//         attributes: ['name'],
//         through: {
//           attributes: []
//         }
//       }
//     })
//     // let activities = await Activity.findAll({include: [{model:Country}]})
//     if(activities.length > 0) return activities;
//     else return [];
//     // return activities;
//   } catch(error) {
//     return error;
//   }
// }

const getActivities = async () => {
  return await Activity.findAll({
    include: {
      model: Country,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

module.exports = getActivities;