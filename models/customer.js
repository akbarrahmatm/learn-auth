"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasOne(models.User, {
        foreignKey: {
          name: "customerId",
        },
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.NUMBER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
