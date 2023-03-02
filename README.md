# About KittyNote:
![Screenshot 2023-02-27 at 4 10 25 PM](https://user-images.githubusercontent.com/113630766/221718210-abc5108e-7ff8-4cba-a440-2648a4170919.png)


Welcome to KittyNote, the cat-themed Evernote clone! Are you a cat lover looking for a fun and quirky note-taking app? Look no further than KittyNote! With its playful cat design and powerful note-taking features, KittyNote is the purr-fect way to keep track of all your ideas and inspirations. Give it a try and let the cat-tastic journey begin! [Click here to view KittyNote Live Site](https://kittynote.onrender.com/)

### Please see below links to project Wiki:
* [Feature List](https://github.com/thuynh789/KittyNote/wiki/Features-List)
* [User Stories](https://github.com/thuynh789/KittyNote/wiki/User-Stories)
* [Database Schema](https://github.com/thuynh789/KittyNote/wiki/DB-Schema)


### This project is built with:
* Frontend: JavaScript, React/Redux
* Backend: Python, Flask
* Database: PostgreSQL, SQLAlchemy

### This project is built by:
* [Tiana Huynh](https://www.linkedin.com/in/tiana-huynh-58b296168/)

# Getting Started:
1. Download the starter by cloning this repo.
   ```bash
   git clone https://github.com/ctam312/Plantsy.git
   ```
2. Install dependencies
   ```bash
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   ```bash
   SECRET_KEY=<your secret key>
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=flask_schema
   ```
4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```
5. Start frontend server in `react-app` directory
   ```bash
   npm install
   npm start
   ```
6. In your browser go to `localhost:3000`

# Features Directions:

## Landing Page:
Users can log in, sign up, or log in as a demo user. Users must be logged in to use features. 
![Screenshot 2023-03-02 at 8 17 46 AM](https://user-images.githubusercontent.com/113630766/222487026-4f6098d2-036a-4fcf-9f3f-276fd73dff5d.png)

## Home Page: 
Authenticated users can view, create, update, and delete notes and notebooks through the home page or through links in the left side nav bar. 
![Screenshot 2023-03-02 at 8 20 19 AM](https://user-images.githubusercontent.com/113630766/222487752-cad01c45-04e4-42a7-9090-7fa77f9319e6.png)


## Notebooks:
Authenticated users can view, create, update, and delete notebooks. 
![Screenshot 2023-03-02 at 8 24 54 AM](https://user-images.githubusercontent.com/113630766/222489558-b02708fd-e6a5-44cb-ae3b-ff9d4b8de477.png)
New notebook form:
![Screenshot 2023-03-02 at 8 25 15 AM](https://user-images.githubusercontent.com/113630766/222489698-ab4ffbbf-20ad-483d-9cab-8659f4b954a8.png)

## Notes:
Authenticated users can view, create, update, and delete notes. 
![Screenshot 2023-03-02 at 8 30 42 AM](https://user-images.githubusercontent.com/113630766/222491492-df6f3e9d-166e-4ea3-b61e-305da61504cd.png)
Users can create a new note and add it to a notebook. Users are also able to move notes between notebooks. 
![Screenshot 2023-03-02 at 8 34 49 AM](https://user-images.githubusercontent.com/113630766/222492616-a24e3a88-a539-470a-ad60-29ad41f72710.png)



