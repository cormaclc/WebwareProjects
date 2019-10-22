// function createProject(id, email, name, description, skills, membersNeeded, isFunded, startTime, duration){
//   return {
//     id: id,
//     email: email,
//     name: name,
//     description: description,
//     skills: skills,
//     membersNeeded: membersNeeded,
//     isFunded: isFunded,
//     startTime: startTime,
//     duration: duration
//   };
// }

/*
{
	"email": "USER EMAIL",
	"skills": ["List", "of", "skills"],
  "topics": ["list", "of", "topics"],
	"membersNeeded": number of members,
	"isFunded": true or false,
	"startTime": "YYYY-MM-DD",
	"duration": number of days,
  "id": "SET BY SERVER"
}

*/

class ProjectAPI {
  static get(id, callback){
    fetch('/api/projects/' + id)
      .then(res => res.json())
      .then(callback);
  }

  static getAll(callback){
    fetch('/api/projects')
      .then(res => res.json())
      .then(callback);
  }

  static create(project, callback){
    fetch('/api/projects', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json; charset=utf-8",
       },
      body: JSON.stringify(project)
    })
    .then(res => res.json())
    .then(callback)
  }

  static update(id, project, callback){
    fetch('/api/projects/' + id, {
      method: 'PUT',
      headers: {
           "Content-Type": "application/json; charset=utf-8",
       },
      body: JSON.stringify(project)
    })
    .then(res => res.json())
    .then(callback)
  }

  static remove(id, callback){
    fetch('/api/projects/' + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(callback)
  }

};

export default ProjectAPI;
