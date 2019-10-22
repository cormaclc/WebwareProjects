const path = 'messages/';

class MessageDB {
  constructor(database){
    this.database = database;
  }

  get(id, callback){
    this.database.get(path, id, callback);
  }

  getAll(callback){
    this.database.getAll(path, callback);
  }

  update(id, message, callback){
    var m = message;
    if (m.id){
      delete m.id;
    }
    callback(this.database.update(path, id, m));
  }

  remove(id, callback){
    callback(this.database.remove(path, id));
  }

  create(message, callback){
    var m = message;
    if (m.id){
      delete m.id;
    }
    callback(this.database.create(path, m));
  }
}


module.exports = MessageDB;
