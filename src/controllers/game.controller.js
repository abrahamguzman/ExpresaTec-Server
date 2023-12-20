const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const games = await db.game.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const game = await db.game.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] }
      });
    if (game === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const game = await db.game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const gameId = req.params.id;
    await db.game.update(req.body, {
      where: {
        id: gameId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `game ${gameId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const gameId = req.params.id;
    await db.game.update({
      active: false
    }, {
      where: {
        id: gameId
      }
    });
    res.status(200).json({ msg: `game ${gameId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findGameActivitiesFromGame = async (req, res) => {
  try {
    const gameActivities = await db.gameActivity.findAll({
      attributes: { exclude: ['active'] },
      where: {
        gameId: req.params.id,
      },
      include: [
        {
          model: db.emotion,
          as: 'emotion',
          attributes: ['name']
        }
      ]
    });

    res.status(200).json(gameActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findGameActivitiesFromGame
};
