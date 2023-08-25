const database = require('../config/database');

exports.getUsers = function () {
	return database.query('select * from users');
};

exports.getUser = function (id) {
	return database.oneOrNone('select * from users where id = $1', [id]);
};

exports.getUserByEmail = function (email) {
	return database.oneOrNone('select * from users where email = $1', [email]);
};

exports.saveUser = function (user) {
	return database.one('insert into users (email, password) values ($1, $2) returning *', [user.email, user.password]);
};

exports.updateUser = async function (id, user) {
	try {
        const a = await database.none('update users set email = $1, password = $2 where id = $3', [user.email, user.password, id]);
        console.log("a", a)
		return true; 
    } catch (error) {
        return error; 
    }
};

exports.deleteUser = function (id) {
	return database.none('delete from users where id = $1', [id]);
};
