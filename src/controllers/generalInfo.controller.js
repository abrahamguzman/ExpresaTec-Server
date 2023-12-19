const db = require('../models/index.js');

// Todos los actives
const findById = async (req, res) => { // { nombre: 'nombre' }
  try {
    const user = await db.user.findByPk(
      req.params.id,
      {
        attributes: ['id'],
        include: [{
          model: db.child,
          as: 'children',
          attributes: ['firstname', 'lastname', 'urlImage']
        }]
      });

    const categories = await db.category.findAll({
      attributes: ['id', 'name', 'urlImage'],
      where: {
        active: true
      }
    });

    const games = await db.game.findAll({
      attributes: ['id', 'name', 'slogan', 'urlImage'],
      where: {
        active: true
      },
      include: [{
        model: db.category,
        as: 'category',
        attributes: ['scenery']
      }]
    });

    const generalInfo = {
      user,
      categories,
      games
    };

    res.status(200).json(generalInfo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  findById
};
