const path = 'projects/';

class ProjectDB {
  constructor(database){
    this.database = database;
  }

  get(id, callback){
    this.database.get(path, id, callback);
  }

  getAll(callback){
    this.database.getAll(path, callback);
  }

  update(id, project, callback){
    var p = project;
    delete p.id;
    callback(this.database.update(path, id, p));
  }

  remove(id, callback){
    callback(this.database.remove(path, id));
  }

  create(project, callback){
    var p = project;
    if (p.id){
      delete p.id;
    }
    callback(this.database.create(path, p));
  }
}


module.exports = ProjectDB;
