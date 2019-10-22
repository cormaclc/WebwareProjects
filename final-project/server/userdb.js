const bcrypt = require('bcryptjs');

const path = 'users/';

class UserDB {
  constructor(database){
    this.database = database;
  }

  authenticate(user, callback){
    this.database.getAll(path, (users) => {
      var authenticatedUsers = users.filter(u => {
        return user.email == u.email && bcrypt.compareSync(user.password, u.password);
      });

      if (authenticatedUsers.length){
        delete authenticatedUsers[0].password;
        callback(authenticatedUsers[0]);
      } else {
        callback({});
      }
    });
  }

  getAll(callback){
    this.database.getAll(path, (users) => {

      users = users.map(user => {
        delete user.password;
        delete user.id;
        return user;
        // TODO: maybe delete more stuff
      })

      callback(users);
    });
  }

  getBasicInfo(email, callback){
    this.database.getAll(path, (users) => {
      var matchedUsers = users.filter(u => {
        return email == u.email;
      });

      if (matchedUsers.length){
        delete matchedUsers[0].password;
        delete matchedUsers[0].id;
        // TODO: maybe delete more stuff
        callback(matchedUsers[0]);
      } else {
        callback({});
      }
    });
  }

  update(id, user, callback){
    var u = user;
    //delete u.id;
    u.password = bcrypt.hashSync(u.password, 14);
    callback(this.database.update(path, id, u));
  }

  remove(id, callback){
    callback(this.database.remove(path, id));
  }

  create(user, callback){
    var u = user;
    if (u.id){
      delete u.id;
    }
    // Make sure email doesn't exist
    // TODO: make async
    u.password = bcrypt.hashSync(u.password, 14);
    callback(this.database.create(path, u));
  }
}


module.exports = UserDB;
