const statusDbConnection = async function (db) {
	console.log('Checking database connection...');
	try {
		await db.sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
	}
};

const syncDb = function (db) {
	return db.sequelize.sync()
		.then(() => {
			console.log('Synced db.');
		})
		.catch((err) => {
			console.log('Failed to sync db: ' + err.message);
		});
};

module.exports = {
	statusDbConnection,
	syncDb
};
