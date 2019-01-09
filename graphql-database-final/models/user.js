const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    User.hasMany(models.Car, { onDelete: 'CASCADE' })
  };

  return User;
}

module.exports = user;