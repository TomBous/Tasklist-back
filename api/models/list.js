'use strict';
const { Model } = require('sequelize');
const { Task } = require('./task')

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task, Project}) {
      // define association here
      this.belongsTo(Project, {
        allowNull: false,
        onDelete: 'CASCADE'
      })
    }
  };
  List.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inPreview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    taskList: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};