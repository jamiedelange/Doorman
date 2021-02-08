const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Nurse extends Model {
}

module.exports = function(sequelize, DataTypes) {
  // class Nurse extends Model {}}
const nurse = sequelize.define("Nurse", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Nurse',
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'Nurse'
  });
  nurse.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  nurse.addHook("beforeCreate", (nurseType) => {
    nurseType.password = bcrypt.hashSync(nurseType.password, bcrypt.genSaltSync(10), null)
  })
  return nurse;
};

module.exports = Nurse;