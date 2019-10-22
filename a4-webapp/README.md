## Online Commerce | BeatFactory
Cormac Lynch-Collier
webapp: https://a4-cormaccollier.herokuapp.com
api: https://a4-cormaccollier-api.herokuapp.com
(the repo for the api is cormaccollier/beatfactory-api)


A friend of mine makes beats (music) and wanted to sell them online. I thought this was a great opportunity to help him out with that. I made the Front-End for this application in React and the api in Python with Django. The API acts as a database and the frontend makes GET requests to it to display the beats.
Front-end:
On the home page there is a list of beats where the user can listen to them, and then add them to their cart (saves on LocalStorage). On the cart page users can remove items from their cart (one at a time, or all at once) or they can checkout using the PayPal API. This can be tested by adding items to the cart and checking out, and choosing debit/credit card. The next page will show how much the combined total is in the top right corner. If a user was to to put in their details, after the payment went through, my friend would send them the beat (when this becomes a real site there will be a page explaining this).
Back-end:
If you visit the api page you can see that you require a API key to see the information (the frontend passes this through as a header). However if you go to /admin on the api you can login in and add beats. Username: cglynchcollier, Password: beatpassword. There's a lot of information here but the important link is "Files" which is where you can add beats. You can test it by adding a file and then deleting it after, or edit a current file, all the files on the site were added through the api. One thing to note is the /admin page crashed for me when I tried to add an application that was too large.

Notes on Web Browsers:
I developed and tested on chrome where everything works as intended. On safari however the audio files cannot be loaded, and the styling is different. You can still add the items to your cart and check out though.
This is what it looks like on my computer (chrome):
![alt text](/images/homepage.png)

## Technical Achievements
- **React**: The front-end of the site is built entirely in React. I had some experience before this but now I feel more comfortable using it.
- **Redux**: To quote their website "Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test." https://redux.js.org/ I used Redux to interact with the API and store that information separately from the src code.
- **PayPal API**: To handle payments in a secure way I integrated the PayPal API. I set up a react container for it and it is connected to my PayPal developer account so if someone was to go through the whole process fo paying, that money would go to my account.
- **Environment Variables**: To keep the API link and most importantly the API key and the PayPal key secure I used environment variables. Environment variables are passed through the server so they are not accessible from the front end. Learning about these was fascinating and is really useful for creating secure applications.
- **Django API**: I had previously tried to start building some applications using Django but this was the first time I ever went through with it. Using Django REST Framework to create an API was very interesting and a good experience. Building models for data, like the file model where you can upload beats was great to keep my data in clear objects.
- **API Key**: To set up the API key I used a Django Library. There wasn't very much documentation on it so I had to add it to the admin panel which was a lot of trouble. As I previously said, it's stored as an environment variable and passed through the header of a request.

### Design/Evaluation Achievements
- **Icon Changes**: Using React can be very useful when doing interface changes and event interaction such as changing the icon when adding to the cart. This change is a clear indicator to the user that the item is in the cart and is persistent through page changes/refreshes.
- **CSS Animation and Transition**: I had never used CSS animations or transitions so I wanted to try them out in this project. I incorporated them on loading the home page where first the items load in order going down the page.
- **Styled Components**: Styled components is a React library for doing css. I used them to do the fade in on the home page for the beats. To make sure that each item in the list of beats came in one after another, I had to pass a value to the styled component being rendered. It was this value that told the component how long to wait before fading in.