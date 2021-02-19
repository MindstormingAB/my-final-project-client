# Final project - The Epilepsy App

I built this application during the final sprint of the Technigo Bootcamp for frontend developers (fall 2020 edition). The purpose of this project was to wrap up everything I learnt during the program and to build one bigger application.

My son was diagnosed with epilepsy 8 years ago. He is still looking for an adapted treatment and our family is quite affected by the disease. We have been testing different apps in our try to identify seizure patterns but we have not found a tool that fits us yet.

During the Technigo Bootcamp, I have come in contact with powerful techniques, frameworks and libraries and discovered a new world of possibilities. I'd like to use my new knowledge to develop the app epileptics need. This application is my first step in this journey.

## What it does

In this application, you can:
- register a new account
- log in as an existing user
- access your data after login/signup (as authorized user)
- log out or reload your data in section Home
- add, edit and delete seizure information in section Seizures
- visualize the past week's epileptic activity in section Dashboard
- add, edit, delete and call emergency and healthcare contacts in section Contacts
- create a wallpaper for your mobile with your emergency contact information in section Wallpaper
- log out
- delete your account

## The approach

I started the project by created a backend, see https://github.com/MindstormingAB/my-final-project-server for more information.

The following step consisted in creating the content in frontend.

I first created the different routes (using React Router) and their components:
- `/` for login, signup, home page and reload function 
- `/dashboard` for dashboard and diagram
- `/seizures` for seizure registration, edition and deletion
- `/contacts` for contact registration, edition and deletion
- `/wallpaper` and `/wallpaper/preview` for the wallpaper tool
- `/profile` for profile edition and account deletion

I created Styled Components for all recurrent design and stored them in `lib/Styling.js`, along with a color palette in `lib/constants.js`.
The diagram in section Dashboard required some data manipulation and the usage of the Chart.js library and its React wrapper react-chartjs-2.

I set up a Redux store to save the data fetched from the database with the [Epilepsy App's API](https://ep-app-api.herokuapp.com/) and wrote thunks for most of the fetches in `reducers/reusable.js`.
In addition to the reducer `user.js`, I created the reducer `ui.js` to take care of the loading and wallpaper modes.
Access token, user Id and first name are stored both in redux store and local storage for a better user experience. Access token and user Id are used in all requests to increase security level.
I made sure that the data was fetched at signup/login and reload and updated in both Redux store and database when edited/added/deleted.

Then, I created an animated hamburger menu mainly based on React Router hook Navlink.

Finally, I made a copy of this repository and converted it to a Progressive Web Application. See https://github.com/MindstormingAB/my-final-project-client-pwa for more information

## Limitations

If I had more time, I would have:
- added a seizure registration button in sections Home and Dashboard
- solved the compatiblity issue with input fields date and datetime-local in MacOS Safari and Firefox in a better way (see description under Compatibility)
- made the dashboard look better on desktops
- made it possible to choose which emergency contacts to be displayed on wallpaper
- added a section Medication
- created different diagrams to choose between

## Responsiveness

Since the application is by nature aimed for mobile devices, it has been developed with a mobile first approach. Though the application is responsive "by default", its design is therefore more adapted for mobiles and tablets than for desktops. The responsiveness has been tested in dev tools in Safari, Chrome, Firefox and Edge: everything works as expected but the diagram looks better in taller windows.

## Compatiblity

The application has been tested in Chrome, iOS Safari, Edge, Firefox and MacOS Safari. It works overall as expected except for some input fields that are not cross-browser compatible:
- datetime-local input field is rendered as a text box in Firefox and MacOS Safari. To overcome the problem, I added a pattern validation and a placeholder showing what format should be used in seizure form. In addition to that, a new seizure created without date and time will be stored with current time; it is easier to edit an existing seizure time than entering date and time manually from scratch.
- date input field is rendered as a text box in MacOS Safari. To overcome the problem, I added a pattern validation and a placeholder showing what format should be used in profile form.

## Accessibility

The application has been optimized for screen readers and gets an 96% accessibility score in LightHouse.

## Tech used

- [Create React App](https://github.com/facebook/create-react-app)
- HTML5
- CSS3
- JavaScript ES6
- React
- Redux
- React Router
- Chart.js/react-chartjs-2
- Styled components
- Sweet Alert
- Moment

On the backend side of the project (see https://github.com/MindstormingAB/my-final-project-server for more information):
- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- CORS
- express-list-endpoints

## View it live

This repository is located on https://github.com/MindstormingAB/my-final-project-client.
You can take a look at the result on https://epilepsy-app.netlify.app/.
The API can be found on https://ep-app-api.herokuapp.com/.
There is also a Progressive Web App version on https://epilepsy-app-pwa.netlify.app/ and you can find more information about it on https://github.com/MindstormingAB/my-final-project-client-pwa. 
Enjoy!