require('dotenv').config();

const pgp = require('pg-promise')();
const db = pgp({
	user: process.env.USER_DB,
	password: process.env.PASSWORD_DB,
	host: process.env.HOST_DB,
	port: process.env.PORT_DB,
	database: process.env.DATABASE_DB
});

module.exports = db;
