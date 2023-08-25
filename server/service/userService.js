const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userData = require('../data/userData');
const User = require('../models/User');

exports.createUser = async (req, res, next) => {
	try {
		const existingUser = await userData.getUserByEmail(req.body.email);
		if (existingUser !== null) {
			return res.status(400).json({ message: "Email já cadastrado na aplicação." });
		}

		const hash = await bcrypt.hash(req.body.password, 10);
		const user = new User(req.body.email, hash);

		const result = await userData.saveUser(user);
		if (result) {
			return res.status(201).json({ message: "Usuário criado com sucesso.", result });
		}
		else {
			return res.status(500).json({ message: "Falha ao criar usuário." });
		}
	} catch (error) {
		return res.status(500).json({ message: "Erro ao criar usuário - " + error});
	}
}

exports.updateUser = async (req, res, next) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10);
		const user = new User(req.body.email, hash);

		const result = await updateUser(req.params.id, user.email, user.password);
		if (result === true) {
			return res.status(201).json({ message: "Usuário atualizado com sucesso." });
		}
		else {
			return res.status(500).json({ message: "Falha ao atualizar usuário - " , result});
		}
	} catch (error) {
		return res.status(500).json({ message: "Erro ao atualizar usuário - " + error});
	}
}
