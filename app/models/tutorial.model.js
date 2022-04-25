const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        is_published: {
            type: Sequelize.INTEGER
        },
        author: {
            type: Sequelize.STRING
        },
    });
    sequelizePaginate.paginate(Tutorial)
    return Tutorial;
};