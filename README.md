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
   - Admin: can create, edit, and delete jobsites, teams, users, update/modify permissions on all users and do anything a supervisor can do 



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
![Imgur](https://i.imgur.com/lQ6YPW2.png)

### Signup
![Imgur](https://i.imgur.com/WV72gTC.png)

# Admin panel
User view on the admin panel
![Admin panel](https://i.imgur.com/KDiyHJe.png)

Add jobsite with map search on the admin panel
![Admin panel](https://i.imgur.com/tllRBwu.png)

# Join a jobsite
Upon logging in a user that is not a member of a jobsite is prompted with the avaliable jobsites for them to join
![Join jobsite](https://i.imgur.com/ArBIUnd.png)

# Jobsite navigation
Once you are a member of a jobsite you are presented with all of that jobsites options
![Jobsite member](https://i.imgur.com/6VSYn8b.png)

You can view the weather, along with a graph of the forecasted average and gust wind speeds
![Jobsite member](https://i.imgur.com/w2lcrqt.png)


# Inventory

### Inventory tracking
![Imgur](https://i.imgur.com/YE9ufi5.png)

### Add materials 
![Imgur](https://i.imgur.com/86RKe96.png)

# Chat Rooms
### Create Chat Rooms
![Imgur](https://i.imgur.com/hOTyYpg.png)

# Live Chat
Send messages messages in real time and recieve notifications when a chatroom has a new message.
![Imgur](https://imgur.com/x4ElQqG)

