const crypto = require('crypto');

function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.then((db) => {
		const collection = db.collection('usuarios')

		var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
		usuario.senha = senha_criptografada;

		collection.insert(usuario)
			.catch(err => console.log(err))
	})
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.then((db) => {
		const collection = db.collection('usuarios')

		var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
		usuario.senha = senha_criptografada;

		collection.find(usuario).toArray()
			.then(result =>{

				if(result[0] != undefined){
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}

				if (req.session.autorizado){
					res.redirect('jogo')
				} else {
					res.render('index', {validacao: {}});
				}
			})
			.catch(err => console.log(err))
	})
}

module.exports = function(){
	return UsuariosDAO;
}