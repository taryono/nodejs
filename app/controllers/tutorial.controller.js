var TutorialService = require('../services/tutorial.service')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// Create and Save a new Tutorial
exports.Store = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    is_published: req.body.is_published ? req.body.is_published : 0
  };

  // Save Tutorial in the database
  TutorialService.store(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Find a single Tutorial with an id
exports.findAll = (req, res) => { 
  const { page, size ,query} = req.query;
  const options = {
    attributes: ['id', 'title','description','content','author','is_published'],
    page: page, // Default 1
    paginate: parseInt(size), // Default 25
    order: [['id', 'DESC']], 
  }
  
   
  const where_options = {
    attributes: ['id', 'title','description','content','author','is_published'],
    page: page, // Default 1
    paginate: parseInt(size), // Default 25
    order: [['id', 'DESC']],
    where:{
      title:{
        [Op.like]:`%${query}%`
      }
    }
  }
  const selected_option = query?where_options:options;
  TutorialService.findAll(selected_option)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorials" + err
      });
    });
};
 
// Update a Tutorial by the id in the request
exports.Update = (req, res) => {
  const id = req.params.id;

  TutorialService.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.Delete = (req, res) => {
  const id = req.params.id;

  TutorialService.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  TutorialService.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  TutorialService.findAll({ where: { is_published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findById = async function (req, res, next) {
  // Validate request parameters, queries using express-validator 
  try {
      var tutorial = await TutorialService.findById(req.params.id);
      return res.status(200).json({ tutorial });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}
