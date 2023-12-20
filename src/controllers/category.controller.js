const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const categories = await db.category.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const category = await db.category.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] },
        include: [{
          model: db.game,
          as: 'games',
          attributes: ['id', 'name', 'slogan', 'urlImage'],
          where: {
            active: true
          }
        }]
      });
    if (category === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const category = await db.category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const categoryId = req.params.id;
    await db.category.update(req.body, {
      where: {
        id: categoryId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `category ${categoryId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await db.category.update({
      active: false
    }, {
      where: {
        id: categoryId
      }
    });
    res.status(200).json({ msg: `category ${categoryId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
