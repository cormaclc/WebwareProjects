import UserAPI from './UserAPI';

class Authenticator {

  static signin(email, password, callback){
    fetch('/api/users/authentication', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json; charset=utf-8",
       },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(res => res.json())
    .then(function(user){
      if (typeof user.id !== "undefined"){
        localStorage.setItem("user-id", user.id);
        localStorage.setItem("user-email", user.email);
        callback(user);
      } else {
        callback(null);
      }
    })
  }

  static signout(){
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-email");
  }

  static getCurrentUserID(){
    return localStorage.getItem("user-id");
  }

  static getCurrentUserEmail(){
    return localStorage.getItem("user-email");
  }

  static getCurrentUserInfo(callback){
    UserAPI.get(this.getCurrentUserEmail(), callback);
  }

}


export default Authenticator;
