const db = require('../models');

// Todos los actives
const findAll = async (req, res) => { // { nombre: 'nombre' }
  try {
    const emotions = await db.emotion.findAll({
      attributes: { exclude: ['active'] },
      where: {
        active: true
      }
    });

    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const emotion = await db.emotion.findByPk(
      req.params.id,
      {
        attributes: { exclude: ['active'] }
      });
    if (emotion === null) {
      res.status(200).json([]);
    } else {
      res.status(200).json(emotion);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => { // { nombre: 'nombre'}
  try {
    const emotion = await db.emotion.create(req.body);
    res.status(201).json(emotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => { // { nombre: 'nombre'}
  try {
    const emotionId = req.params.id;
    await db.emotion.update(req.body, {
      where: {
        id: emotionId
      },
      exclude: ['active']
    });
    res.status(200).json({ msg: `emotion ${emotionId} actualizado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res) => {
  try {
    const emotionId = req.params.id;
    await db.emotion.update({
      active: false
    }, {
      where: {
        id: emotionId
      }
    });
    res.status(200).json({ msg: `emotion ${emotionId} actualizado` });
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
