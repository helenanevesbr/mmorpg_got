const UsuariosDAO = require("../models/UsuariosDAO")
const dbConnection = require("../config/dbConnection")
var UsuariosDAOInstance = new UsuariosDAO(dbConnection);

module.exports.index = function(req, res){
	res.render('index', {validacao: {}});
}

module.exports.autenticar = function(req, res){
	var dadosForm = req.body;

	req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
	req.assert('senha', 'Senha não deve ser vazia').notEmpty();
	var erros = req.validationErrors();

	if(erros){
		res.render("index", { validacao: erros });
		return;
	}

	UsuariosDAOInstance.autenticar(dadosForm, req, res);
}