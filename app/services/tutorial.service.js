var model = require('../models')
var Tutorial = model.Tutorial;
const Op = model.Sequelize.Op;
exports.findByPk = async function(query) {
    try {
        var tutorial = await Tutorial.findByPk(query)
        return tutorial;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating tutorials')
    }
}

exports.findAll = async function(options) {
    try {
        return await Tutorial.findAll()
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating tutorials' + e)
    }
}

exports.store = async function(query) {
    try {
        var tutorial = await Tutorial.create(query)
        return tutorial;
    } catch (e) {
        console.table(e);
        // Log Errors
        throw Error('Error while Paginating tutorials')
    }
}

exports.update = async function(data, condition) {
    try {
        var tutorial = await Tutorial.update(data, condition)
        return tutorial;
    } catch (e) {
        console.table(e);
        // Log Errors
        throw Error('Error while Paginating tutorials')
    }
}
exports.destroy = async function(query) {
    try {
        var tutorial = await Tutorial.destroy(query)
        return tutorial;
    } catch (e) {
        console.table(e);
        // Log Errors
        throw Error('Error while Paginating tutorials')
    }
}


exports.findById = async function(query) {

    try {
        var tutorial = await Tutorial.findByPk(query)
        return tutorial;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating tutorial ' + e)
    }
}