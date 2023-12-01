# Blackjack Card Game
A simple blackjack (21) card game for 1 player

## Background
This app is part of a technical assessment. It has been coded mostly following TDD approach.

### Game Rules
Blackjack card game uses the following rules:
* Blackjack hands are scored by their point total.
* The hand with the highest total wins if it doesn't exceed 21. A hand with a higher total than 21 is considered a bust.
* Cards numbered 2 through 10 are worth their face value.
* Face cards (jack, queen, king) are each worth 10 points.
* An ace can be worth 11 points if it doesn't cause the player to bust. If it would cause a bust, it is worth 1 point.

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



## Contributing and Known issues

To contribute to this repository feel free to create a PR.

---

### Structure

As we are starting our app and we don't know the future stories/epics, we are grouping our files by separating concerns technically. The client is on the the `client` folder and is based on react (create-react-app).

So if you are contributing to this project please keep that in mind.

## Committing

-  We usually have **two reviewers** per merge request, to share knowledge as wide a possible in our team. We encourage pair review sessions too.
-  We plan to have a **pre commit hook**, using`husky`, that runs lint and unit test the project before every commit.
