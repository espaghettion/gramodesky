# GRAMODESKY

## About the project
This project was created during April and May of 2024 as the final project for the DVOP3 Web Backend subject at SSPŠ.

It was inspired by the e-shop GRAMODESKY.CZ (https://www.gramodesky.cz/), allowing users to browse vinyl records, CDs, artists and genres connected to a server that is connected to a PostgreSQL database, also allowing them to create accounts and make orders with them.

There is also an administrator login, which allows you to create and edit data in the database.

## Technologies used
The frontend of this project was created in HTML with the help of the Vue framework, using Pinia to fetch and store data from the API. The SCSS language was used for styling. 

The backend was created with the help of the Express framework, sending SQL queries to retrieve data from the database. Multiple middlewares were used as well, mainly body-parser for parsing retrieved data and express-fileupload for the ability to upload images.

## Setup
To run the project locally, install all the dependencies necessary with ```npm install```, then first run the Express server with ```npm run dev``` and then run the Vue project with ```npm run dev```
