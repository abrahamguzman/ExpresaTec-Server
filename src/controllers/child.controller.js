const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const children = await db.child.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const child = await db.child.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] }
      });
    if (child === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(child);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const child = await db.child.create(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const childId = req.params.id;
    await db.child.update(req.body, {
      where: {
        id: childId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `child ${childId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const childId = req.params.id;
    await db.child.update({
      active: false
    }, {
      where: {
        id: childId
      }
    });
    res.status(200).json({ msg: `child ${childId} actualizado` });
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
