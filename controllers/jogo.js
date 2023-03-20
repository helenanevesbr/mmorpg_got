const JogoDAO = require("../models/JogoDAO");
const dbConnection = require("../config/dbConnection")
var JogoDAOInstance = new JogoDAO(dbConnection);

module.exports.jogo = function(req, res){

	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;
	}else{

		var msg = '';
		if(req.query.msg !== ''){
			msg = req.query.msg
		}

		var usuario = req.session.usuario;
		var casa = req.session.casa;

		JogoDAOInstance.iniciaJogo(res, usuario, casa, msg);
	}
}

module.exports.sair = function(req, res){
	req.session.destroy( function(err){
		res.render("index", { validacao: {} })
	});
}

module.exports.suditos = function(req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;
	}
	res.render("aldeoes", { validacao: {} })
}

module.exports.pergaminhos = function(req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;
	}

	var usuario = req.session.usuario
	JogoDAOInstance.getAcoes(usuario, res);
}

module.exports.ordenar_acao_sudito = function(req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;
	}
	var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=A'); //redirect, e não render, porque o método do res é post, não get
		return;
	}


	dadosForm.usuario = req.session.usuario;

	JogoDAOInstance.acao(dadosForm);

	res.redirect('jogo?msg=B'); 
}

module.exports.revogar_acao = function(req, res){
	var url_query = req.query;

	var _id = url_query.id_acao
	JogoDAOInstance.revogarAcao(_id, res);
}