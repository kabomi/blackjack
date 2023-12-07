# Blackjack Card Game
A simple blackjack (21) card game for 1 player

## Background
This app is part of a technical assessment. It has been coded mostly following BDD approach.

## How to play the game
- Press the button "NEW GAME"
- Choose one of two options:
  - Press "HIT" to draw a card from the deck
  - Press "HOLD" to let the game finish
- After the game is finished:
  - You will see a dialog which tells you who is the winner and with how many points.
  - you can choose to start a new game by pressing the dialog button "NEW GAME"

### Game Rules
Blackjack card game uses the following rules:
* Blackjack hands are scored by their point total.
* The hand with the highest total wins if it doesn't exceed 21. A hand with a higher total than 21 is considered a bust.
* Cards numbered 2 through 10 are worth their face value.
* Face cards (jack, queen, king) are each worth 10 points.
* An ace can be worth 11 points if it doesn't cause the player to bust. If it would cause a bust, it is worth 1 point.

#### Additional necessary rules
Other rules taken from https://en.wikipedia.org/wiki/Blackjack :
* 52 Card deck (shuffled)
* No bets but the current total points (points of all visible cards)
* Dealer deals two cards to the player
* Dealer cannot draw extra cards
* A Draw game has been added (when player not busted & player's points = dealer's points)

### Game Requirements
Create a simple user interface (UI) for the game. The UI should allow the player to:
* Start a new game.
* See their current hand and point total.
* Draw additional cards (Hit) or end their turn (Stand).
* Display the dealer's hand, keeping one card hidden (the hole card).
* Announce the winner (player or dealer) at the end of the game.
* Implement a service or backend logic to support the game. This includes the game rules, scoring, and the reason for determining the winner.
* Write tests to ensure the functionality of your code. Test coverage is essential.
* Create clean and maintainable code focusing on object-oriented programming (OOP) principles.

## Prerequisites
- Node Version >= 18.18.2
- Npm Version >= 9.8.1

## Getting Started

### General Info
- This app is created from the scratch, but the client based on react was created using: `yarn create react-app` which generates a react app.

### Starting the application
--

Before starting the application you need to install the recommended versions of Node and NPM. Then you are fine running `yarn` to install all the npm packages.
After starting the application with `yarn dev` you can open it on your browser at [http://http://localhost:8080/](http://http://localhost:8080/).

### `yarn dev`

Runs the app in the development mode.<br />
This means the server will point to a local instance on [http://localhost:8080](http://localhost:8080). It will listen to any changes on the server.

The client app connects to the server via proxy set on package.json pointing to [http://localhost:8080](http://localhost:8080)

Limitation: Right now, if you want to see your client changes you'll have to run `yarn build:client`.


### `yarn start`

Runs the app in the production mode.<br />
This means it will point to a local instance on [http://localhost:8080](http://localhost:8080).



## Testing the application

At this time, we only have unit tests, but it is planned to have some e2e tests using playwright or cypress.

---

### `yarn test`

This command, will launch a Jest Test Runner in watch mode. The runner will run all the tests whenever a change in your code happens.

### `yarn lint`

We are using eslint with prettier in order to avoid typical issues and to have a common coding-style.
Feel free to configure your IDE prettier/eslint plugins to don't have the need to run this command.

## Building the application

### `yarn build:client`

This command will generate the client production files, ready to be deployed.

## Contributing and Known issues

To contribute to this repository feel free to create a PR.

---

### Structure

As we are starting our app and we don't know the future stories/epics, we are grouping our files by separating concerns technically. The client is on the the `client` folder and is based on react (create-react-app).

So if you are contributing to this project please keep that in mind.

## Committing

-  We usually have **two reviewers** per merge request, to share knowledge as wide a possible in our team. We encourage pair review sessions too.
-  We plan to have a **pre commit hook**, using`husky`, that runs lint and unit test the project before every commit.
