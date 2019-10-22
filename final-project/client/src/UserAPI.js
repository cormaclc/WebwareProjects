// {
//   name: "User's name",
//   email: "Email (unique)",
//   password: "Password (not hashed)", // Only needed for the creation, will not be returned by the server
//   skills: ["list", "of", "skills"],
//   lookingForProjects: true or false,
//   projInterests: ['list', 'of', 'interests'],
//   maxProjectDuration: max duration or -1 if no preference,
//   canFund: true or false,
//   teamSize: number of teammates wanted
// }

class UserAPI {
  static get(email, callback){
    fetch('/api/users/' + email)
      .then(res => res.json())
      .then(callback);
  }

  static create(user, callback){
    fetch('/api/users', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json; charset=utf-8",
       },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(callback)
  }

  static update(email, id, user, callback){
    fetch('/api/users/' + email, {
      method: 'PUT',
      headers: {
           "Content-Type": "application/json; charset=utf-8",
       },
      body: JSON.stringify({user: user, id: id})
    })
    .then(res => res.json())
    .then(callback)
  }

  static remove(email, id, callback){
    fetch('/api/projects/' + email, {
      method: 'DELETE' // TODO: set body to user id
    })
    .then(res => res.json())
    .then(callback)
  }

};

export default UserAPI;
