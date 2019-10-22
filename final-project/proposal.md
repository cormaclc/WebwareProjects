# Project Finder

Have you ever had a great idea, but ultimately threw it away because it seemed impossible or too ambitious for one person?

Computer science students are always looking for side projects to work on, but have a difficult time determining where to start. People with life-changing solutions are looking for talented and passionate developers to help them materialize their ideas, but may not have the funding to do so. [Insert project name] seeks to create mutually beneficial relationships by connecting innovators with capable developers.

The platform is intended to be similar to kickstarter, but instead of entrusting creators with donations, users offer their time and expertise. All the creator has to do is create a project description, upload any supporting media, and include the type of developers (front-end, back-end, mobile, Java, C++, etc.) that they are looking for. [Insert project name] will compile the information and display it in a readable and modern looking template. (Alternatively/optionally the creator could be allowed to write their own HTML and personalize their post). In essence, the purpose of [Insert project name] is to serve as an aggregation platform that displays open-source/personal projects in one convenient location, enabling developers to gain real world experience and creators to actualize their ideas. 

The system will also attempt to recommend people to projects, based on their skills, interests, and past experience with other teams. 

## Features
- Create a project
- View available projects
- Sign up for a project
- View recommended projects
- Use custom HTML on project descriptions (maybe a version of GitHub markdown)
- Send messages to project owners
    - Through email
    - Through the web app (message box format)
    
## Technology needed
- Database (Mongo or Firebase)
- Email (on server side)
- Recommender system (most likely not ML)
- Markdown support
- Messages (either websockets for real time or just XMLHttpRequests done frequently)
- User accounts

## Team members
- Cormac Lynch-Collier
- Kyle Corry
- Matthew Kornitsky
