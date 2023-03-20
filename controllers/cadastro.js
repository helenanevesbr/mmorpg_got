const UsuariosDAO = require("../models/UsuariosDAO")
const JogoDAO = require("../models/JogoDAO")
const dbConnection = require("../config/dbConnection")
const UsuariosDAOInstance = new UsuariosDAO(dbConnection);
const JogoDAOInstance = new JogoDAO(dbConnection);

module.exports.cadastro = function (req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(req, res){

	var dadosForm = req.body;

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	UsuariosDAOInstance.inserirUsuario(dadosForm);
	JogoDAOInstance.gerarParametros(dadosForm.usuario);
	

	res.send('podemos cadastrar')
}