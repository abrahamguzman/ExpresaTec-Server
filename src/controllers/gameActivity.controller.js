const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const gameActivities = await db.gameActivity.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(gameActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const gameActivity = await db.gameActivity.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] }
      });
    if (gameActivity === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(gameActivity);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const gameActivity = await db.gameActivity.create(req.body);
    res.status(201).json(gameActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const gameActivityId = req.params.id;
    await db.gameActivity.update(req.body, {
      where: {
        id: gameActivityId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `gameActivity ${gameActivityId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const gameActivityId = req.params.id;
    await db.gameActivity.update({
      active: false
    }, {
      where: {
        id: gameActivityId
      }
    });
    res.status(200).json({ msg: `gameActivity ${gameActivityId} actualizado` });
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
