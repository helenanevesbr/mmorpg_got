/* importar o mongodb */
const { MongoClient } = require('mongodb');

function connMongoDB() {
	
	const client = new MongoClient('mongodb://127.0.0.1:27017');
 	return client.connect().then(() =>{
		const db = client.db('got')
		return db
	})

}

module.exports = function(){
	return connMongoDB;
}