var ObjectID = require('mongodb').ObjectId;

function JogoDAO(connection){
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
    this._connection.then((db) => {
        const collection = db.collection('jogo')
        collection.insert({
            usuario: usuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000),
        })
            .catch(err => console.log(err))
    })
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
	this._connection.then((db) => {
		const collection = db.collection('jogo')
		collection.find({usuario : usuario}).toArray()
			.then(result =>{
                res.render('jogo', {img_casa: casa, jogo: result[0], msg : msg});
			})
			.catch(err => console.log(err))
	})
}

JogoDAO.prototype.acao = function(acao){
    this._connection.then((db) => {

        var date = new Date();
        var tempo = null;
        switch(parseInt(acao.acao)){
            case 1: tempo = 1 * 60 * 60000; break;
            case 2: tempo = 2 * 60 * 60000; break;
            case 3: tempo = 5 * 60 * 60000; break;
            case 4: tempo = 5 * 60 * 60000; break;
        }
        acao.acao_termina_em = date.getTime() + tempo;

        db.collection('acao').insert(acao)
            .catch(err => console.log(err))

        var moedas = null
        switch(parseInt(acao.acao)){
            case 1: moedas = -2 * acao.quantidade; break;
            case 2: moedas = -3 * acao.quantidade; break;
            case 3: moedas = -1 * acao.quantidade; break;
            case 4: moedas = -1 * acao.quantidade; break;
        }
        db.collection('jogo').update(
            { usuario: acao.usuario},
            { $inc: {moeda: moedas}}
        );
    })
}

JogoDAO.prototype.getAcoes = function(usuario, res){
    this._connection.then((db) => {
        const collection = db.collection('acao')
        
        var momento_atual = new Date().getTime();

        collection.find({usuario : usuario, acao_termina_em: {$gt:momento_atual}}).toArray()
            .then(result =>{
                res.render("pergaminhos", { acoes: result })
            })
            .catch(err => console.log(err))
    })
}

JogoDAO.prototype.revogarAcao = function(_id, res){
    this._connection.then((db) => {
        const collection = db.collection('acao')
        collection.remove(
            {_id : ObjectID(_id)}, // dentro do MongDB _id é um objeto, não uma string
            function(err, result){
                res.redirect('jogo?msg=D');
            }
        );
    })
}

module.exports = JogoDAO;