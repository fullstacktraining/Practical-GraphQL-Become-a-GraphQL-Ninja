const { sequelize } = require('./models/database');
const models = require('./models');

const createData = async() => {
  await models.User.create({
    name: 'Tamas',
    cars: [{
      make: 'Mercedes',
      model: 'A250',
      colour: 'black'
    }]
  }, {
    include: [models.Car]
  });

  await models.User.create({
    name: 'Susan',
    cars: [{
      make: 'Toyota',
      model: 'Yaris',
      colour: 'Red'
    }]
  }, {
    include: [models.Car]
  });

  await models.User.create({
    name: 'Steven',
    cars: [{
      make: 'Fiat',
      model: '500',
      colour: 'Yellow'
    }, {
      make: 'Ford',
      model: 'Focus',
      colour: 'Green'
    }]
  }, {
    include: [models.Car]
  });
}

sequelize.sync({ force: true }).then(async() => {
  try {
    await createData();
    process.exit();
  } catch(error) {
    console.error(error);
  }
});