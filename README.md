
# CSCI 39548 Final Project / Pokemon Type Calculator

## About this project
Understanding Pokemon type relationships is critical in Pokemon battle. 
However, by the year of 2024, there are already 1025 Pokemons in total and memorizing each type relationships has became a 
difficult task for many Pokemon lovers. The purpose of this project is to create a platform to take a step ahead for resolving this issue.
Our website provides a service for the user to calculate resistances, weaknesses, and immunities of the input Pokemon.

## Tech Stack
- Frontend: ReactJS
- Backend: ExpressJS (NodeJS)
- Data persistency: MongoDB
- API: PokeAPI: https://pokeapi.co/docs/v2

Additional libraries: 
- TailwindCSS/React-router-dom
- node-fetch/mongoDB

## Group Members
- Ramisha Chowdhury 
- Aaleia Fernado
- Maya Jamaddar
- Michelle Wen
- Gavin Xiao

## Getting Started

Project is split up into two folders, `client` and `server` 
`client` is reactjs frontend, `server` is expressjs backend
Both frontend and backend need to start for page to work

## Frontend
Install reactjs frontend: 
```bash
cd ~/finalproject-csci39548/client
npm i
```
Start frontend: 
```bash
npm start
```

## Backend 
Install expressjs backend:
```bash
cd ~/finalproject-csci39548/server
npm i
```

Create a mongoDB account, (from class Lab5) with a db named `pokemon` and collection inside named `pokemon_types`

make a .env file and paste in your db key with the template provided
```
MONGO_DB_URI=
```

Start dev backend:
```bash
npm start dev
```
