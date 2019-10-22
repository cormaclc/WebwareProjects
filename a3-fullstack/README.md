## Cormac Lynch-Collier | WPI Tutor Service
This is a online tutor request service, specifically for WPI (WPI departments included). It allows students to place
requests for a tutor in a specific course, that request can then be edited or deleted once completed. It operates under
the assumption that students will not delete or modify other students requests. Requests can be filtered by major, so
that someone looking to help another student can find courses they are especially skilled in. The site uses MongoDB for
the database with Mongoose as an object modeling tool.

## Technical Achievements
- **Event Listeners**: I implemented event listeners in a few different places to improve the usability of the site.
All of the buttons use event listeners to trigger a function on click. The filter mechanism works as an event listener
waiting for input change before trigger a function. I had never used event listener's but now I feel as if I have a lot
more confident in using them.
- **Filter Mechanism**: In implementing the filter mechanism I learned more about the array function .filter and the
string function .includes.
- **Edit**: The edit functionality uses the same form as the add which reduces a learning curve for a potential user. On
the edit button click the XMLHTTPRequest is called to get the row from the db that has the same userID as the one that
was clicked. From here that information is then put into the form where it can be edited and resubmitted or the operation
can be canceled.

### Design/Evaluation Achievements
- **Toggle Form/Table**: I felt as if the form was not necessary to show on the page if a potential tutor was using the
page and just wanted to see what requests had been placed. Having the hide and show button allows for a better user
experience, avoiding empty space.
- **Color Scheme**: I wanted to make this application seem like it was meant for WPI and I used color to do this. I
followed the color scheme used on WPI's website, main red: #99192B, and secondary nearly black: #272727. The red and
black color scheme is a pattern followed in many websites, and it aids this application.
- **Alert**: The application triggers an alert on two occasions. When a user deletes a request and when a user attempts
add a request without filling all the fields. These are important design choices from a UX standpoint because it makes
it clear why the table isn't being updated and prevents the user from accidentally deleting a request.