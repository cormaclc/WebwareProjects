class Recommender {
  constructor(projectdb, userdb){
    this.projectdb = projectdb;
    this.userdb = userdb;
    this.cutoff = 50;
    this.weights = {
      skills: 50,
      topics: 35,
      timeline: 10,
      members: 5
    };
  }

  getRecommendedProjects(userEmail, callback){
    this.userdb.getBasicInfo(userEmail, user => {
      if (typeof user.email !== "undefined"){
        // User exists
        this.projectdb.getAll(projects => {
          // sort through projects to see if they match what the user is looking for

          projects.map(project => {
            project.match = 0;
            // By user
            if (user.email === project.email){
              project.match = 0;
              return;
            }

            // By funding
            if (!user.canFund && project.isFunded){
              project.match = 0;
              return;
            }

            // By project duration
            if (user.maxProjectDuration === -1 || typeof user.maxProjectDuration === 'undefined'){
              project.match += this.weights.timeline;
            } else if (project.duration <= user.maxProjectDuration){
              project.match += this.weights.timeline;
            }

            // By teammates
            if (!user.teamSize){
              project.match += this.weights.members;
            } else {
              var diff = Math.abs(project.membersNeeded - user.teamSize);
              project.match += Math.max(0, this.weights.members - diff);
            }

            // By skills (user meets projects skill requirement)
            if (user.skills && project.skills){
              var matchedSkills = 0;
              project.skills.forEach(skill => {
                if (user.skills.indexOf(skill) >= 0){
                  matchedSkills++;
                }
              })
              project.match += matchedSkills / project.skills.length * this.weights.skills;
            }

            // By interest (project meets user topic requirement)
            if (user.projInterests && project.topics){
              var matchedTopics = 0;
              project.topics.forEach(topic => {
                if (user.projInterests.indexOf(topic) >= 0){
                  matchedTopics++;
                }
              })
              // TODO: handle topics, members, timeline, and funding
              project.match += matchedTopics / project.topics.length * this.weights.topics;
            } else {
              project.match += this.weights.topics;
            }

          });

          projects = projects.filter(project => project.match >= this.cutoff);

          callback(projects.sort((a, b) => {
            return b.match - a.match;
          }));
        })
      } else {
        callback([]);
      }
    })
  }

}


module.exports = Recommender;
