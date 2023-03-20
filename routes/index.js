const CadrastroController = require("../controllers/cadastro")
const JogoController = require("../controllers/jogo")
const IndexController = require("../controllers/index")

module.exports = function(application) {

	application.get('/', 				IndexController.index);
	application.post('/autenticar', 	IndexController.autenticar);

	application.get('/cadastro', 			CadrastroController.cadastro);
	application.post('/cadastrar',			CadrastroController.cadastrar);

	application.get('/jogo',				 JogoController.jogo);
	application.get('/sair', 				 JogoController.sair);
	application.get('/suditos', 			 JogoController.suditos);
	application.get('/pergaminhos', 		 JogoController.pergaminhos);
	application.post('/ordenar_acao_sudito', JogoController.ordenar_acao_sudito);
	application.get('/revogar_acao', 		 JogoController.revogar_acao);
}