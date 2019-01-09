const Sequelize = require('sequelize');
const sequelize = new Sequelize('graphql', 'root', 'marina', {
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: false
  }
});

module.exports = {
  sequelize
};