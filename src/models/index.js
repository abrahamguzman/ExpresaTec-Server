const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        },
    },
    define: {
        timestamps: false,
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize);
db.game = require("./game.model.js")(sequelize);
db.child = require("./child.model.js")(sequelize);
db.category = require("./category.model.js")(sequelize);
db.gameActivity = require("./gameActivity.model.js")(sequelize);
db.emotion = require("./emotion.model.js")(sequelize);

// Relations
db.user.hasMany(db.child, { as: "children" }); // User has many children
db.child.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.category.hasMany(db.game, { as: "games" }); // Category has many games
db.game.belongsTo(db.category, { foreignKey: "categoryId", as: "category" });

db.game.hasMany(db.gameActivity, { as: "gameActivities" }); // Game has many game activities
db.gameActivity.belongsTo(db.game, { foreignKey: "gameId", as: "game" });

db.emotion.hasMany(db.gameActivity, { as: "gameActivities" }); // Emotion has many game activities
db.gameActivity.belongsTo(db.emotion, { foreignKey: "emotionId", as: "emotion" });

module.exports = db;
