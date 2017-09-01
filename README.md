# Matchmaker

Matchmaker is a web app that allows players to play various card games against other players. Players who choose a card game to play can find their "match" and compete against each other! Each player has their own profile with a scoreboard documenting their wins and losses.

## Screenshot
!["Screenshot of application"](url)

## Getting Started

1. Update the .env file with your correct local information
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body-parser
- Cookie-parser
- dotenv
- ejs
- express
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg
