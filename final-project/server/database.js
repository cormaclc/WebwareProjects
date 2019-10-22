const firebase = require('firebase');

function initialize(){
    var config = {
    apiKey: "AIzaSyBIIuvuctnQx-kB3dEy0HSbLgUZ1uTOnnI",
    authDomain: "event-manager-2a83e.firebaseapp.com",
    databaseURL: "https://event-manager-2a83e.firebaseio.com",
    projectId: "event-manager-2a83e",
    storageBucket: "event-manager-2a83e.appspot.com",
    messagingSenderId: "75513081943"
  };
  firebase.initializeApp(config);
}

function get(path, id, callback){
  firebase.database().ref(path + id).once('value').then(function(data){
    if (!(data && data.val())){
      callback({});
      return;
    }
    data = data.val();
    data.id = id;
    callback(data);
  })
}

function getAll(path, callback){
  firebase.database().ref(path).once("value").then(function(data){
    if (!(data && data.val())){
      callback([]);
      return;
    }
    data = data.val();

    var keys = Object.keys(data);
    var d = [];
    keys.forEach((key) => {
      var value = data[key];
      value.id = key;
      d.push(value);
    });

    callback(d);
  });
}

function create(path, obj) {
    return firebase.database().ref(path).push(obj).key;
}

function update(path, id, obj){
  return firebase.database().ref(path + id).set(obj);
}

function remove(path, id){
  firebase.database().ref(path + id).remove();
  return true;
}

module.exports = {
  initialize: initialize,
  get: get,
  getAll: getAll,
  create: create,
  update: update,
  remove: remove
};
