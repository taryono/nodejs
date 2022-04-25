const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.STRING
    },
    cellphone: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    refresh_token: {
      type: Sequelize.STRING
    }
  });
  sequelizePaginate.paginate(Users)
  return Users;
};