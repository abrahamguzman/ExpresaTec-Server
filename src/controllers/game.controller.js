const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const users = await db.user.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const user = await db.user.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] }
      });
    if (user === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const user = await db.user.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const userId = req.params.id;
    await db.user.update(req.body, {
      where: {
        id: userId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `user ${userId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const userId = req.params.id;
    await db.user.update({
      active: false
    }, {
      where: {
        id: userId
      }
    });
    res.status(200).json({ msg: `user ${userId} actualizado` });
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
