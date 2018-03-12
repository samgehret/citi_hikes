# CITI HIKES

Ever had a nice day on the weekend, wanted to go for a hike, but didn’t know where to hike or what to do? Citi Hikes is a full stack JavaScript application and hike  blog, focusing on day trip hikes from Washington, DC.

Check it out live here: http://cithikes.com

## Basic Concept
* Use a RESTful API to return hiking data and display it creatively on a Mapbox Map.
* Implement full CRUD functionality using RESTful routes.
* Implement an authentication strategy.

### Technologies Used
* For maps, Mapbox is used.
* Hiking data is returned using the  [Hiking Project Data API](https://www.hikingproject.com/data) 
* This app uses the MEHN stack. MongoDB, Express, HandleBars, and Node.js.
* For authentication, Passport and BCyrpt are used.
* Materialize is used for some basic formatting (nav bar, forms, and buttons)
* Flexbox is used in much of the CSS and layout.

### Functionality
* Plot all hikes returned by the hiking API on a map.
* Have detailed 'show' page of an app which populates with data returned by the hiking API.
* Two models, for hikes and for users.
* A subdocument for comments is embedded into the hike model.
* Full CRUD functionaltiy distributed over both models.
* Admin level role permissions for users, as well as restricted pages for admin users only.
* Configuration parameters in place for deployment to Heroku, with an MLAB Mongo DB.

## Installation instructions
* Clone down this repo
* run "npm install" to include all the dependencies.
* Ensure that you have a local instance of MongoDB running.
* Run "node db/seed.js" to seed the DB with some demo hikes.
* To create an admin user, you must edit a user directly in the DB, by changing the "isAdmin" boolean attribute to true.