const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Emotion = sequelize.define('Emotion', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spanishName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
  });

  return Emotion;
};