# CITI HIKES

Ever had a nice day on the weekend, wanted to go for a hike, but didn’t know where to hike or what to do? Citi Hikes is a full stack javascript application and hike posting blog, focusing on day trip hikes from Washington, DC. You can look at hikes posted by your fellow DMV residents.

### Technologies Used
* This app uses the MEHN stack. MongoDB, Express, HandleBars, and Node.js.
* For authentication, Passport and BCyrpt are used.
* For maps, Google Maps is used.
* Materialize is used for some basic formatting (nav bar, forms, and buttons)
* Flexbox is used in much of the CSS and layout.

### Functionality
* Two models, for hikes and for users.
* Full CRUD functionaltiy distributed over both models.
* User profile pages to view their own posted content.
* Admin level role permissions for users, as well as restricted pages for admin users only.
* Configuration parameters in place for deployment to Heroku, with an MLAB Mongo DB.