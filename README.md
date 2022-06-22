# windVentory

windVentory is an Inventory tracking application centered around wind-energy. Users can signup, upload profile pictures, track inventory, and create chatrooms to chat with eachother. 
This project was an idea I had while working as a blade repair technician. A constant source of strife on the job was the lack of organization of inventory on the job.
This would cause duplicate materials to be ordered, and ultimately increase the amount of money spent on each project.
WindVentory aims to cut costs by providing an easy and efficient way to track materials.

View and test out windVentory on [Heroku](https://windventory.herokuapp.com/)

## Features
- Create an account, sign in, or log in as a demo user
- Create, view, edit, and delete
   - Inventory
   - Chatrooms
   - Live Chat
   - Jobsites
   - Jobsite weather
   - Teams

- Four different levels of user permissions
   - Worker: can join jobsites, teams, view weather, send messages, and manage inventory
   - Lead: can join jobsites, create a team on a jobsite, create chatrooms on a team, and do anything else a worker can do
   - Supervisor: can join jobsites, create chatrooms on jobsites and do anything a lead can do
   - Admin: can create, edit, and delete jobsites, teams, and users as well as do anything a supervisor can do 



## Technologies Used
- React
- Redux 
- Python
- PostgreSQL
- Flask SQLAlchemy
- Socket.io
- Amazon S3


# Splash page
From the splash page, users can choose to create an account, log into an existing account, or log in as a demo user.

### Login
![Imgur](https://i.imgur.com/oW2STGt.png)

### Signup
![Imgur](https://i.imgur.com/WV72gTC.png)


# Inventory

### Inventory tracking
![Imgur](https://i.imgur.com/YE9ufi5.png)

### Add materials 
![Imgur](https://i.imgur.com/86RKe96.png)

# Chat Rooms
### Create Chat Rooms
![Imgur](https://i.imgur.com/hOTyYpg.png)

# Live Chat
### Send messages
![Imgur](https://i.imgur.com/9Jyl4dZ.png)

### Edit/Delete messages
![Imgur](https://i.imgur.com/rx0nsCH.png)
